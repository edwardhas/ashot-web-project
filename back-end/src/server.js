import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { WebSocketServer } from "ws";
import { MongoClient, ObjectId } from "mongodb";
import { User, Products } from "./schema.js";
// import { error } from "console";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import helmet from "helmet";
import "dotenv/config";

async function start() {
  const client = new MongoClient(
    `mongodb+srv://edward885788:2vC7bRgJVW9TC73P@ashotcluster.umsca7q.mongodb.net/?retryWrites=true&w=majority&appName=ashotCluster`
  );
  const app = express();
  app.use(express.json());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"], // Allow images from self and base64-encoded
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles if needed
        // Add more directives based on your requirements
      },
    })
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const assetsDir = path.join(__dirname, "../assets");

  app.use("/images", express.static(path.join(assetsDir)));

  const options = {
    key: fs.readFileSync("./certs/server.key"),
    cert: fs.readFileSync("./certs/server.cert"),
  };

  const server = https.createServer(options, app);
  const stripe = new Stripe(
    "sk_test_51PYwiSRqy7S2QG3uFvutnATahFAikR7lkfRBRDXTK0QG7Xj1tSFxSxeZcO7ivmLlwRycqlrwtCIhlWYBTib5teRW00HqNqHw84"
  );

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket connection established");
    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
      ws.send(`Hello, you sent -> ${message}`);
    });
    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });

  server.listen(8000, () => {
    console.log("HTTPS Server running on port 8000");
  });

  await client.connect();
  const db = client.db("test");

  async function populatedCartIds(cartItems) {
    return Promise.all(
      cartItems.map((item) =>
        db
          .collection("products")
          .findOne({ _id: new ObjectId(item.productId) })
          .then((product) => ({
            ...product,
            quantity: item.quantity,
          }))
      )
    );
  }

  async function isInStock(id) {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    return product.isInStock;
  }

  //!! findUserByInput()
  // async function findUserByInput(userData, isId) {
  //   if (!isId) {
  //     const user = await db.collection("users").findOne({ email: userData });
  //     console.log(user, user._id, user.email);
  //     return user;
  //   }
  //   const user = await db
  //     .collection("users")
  //     .findOne({ _id: new ObjectId(userData) });
  //   console.log(user, user._id, user.email);
  //   return user;
  // }
  //!! updateUserCartById()
  // async function updateUserCartById(userId, productId, addToCart) {
  //   if (addToCart) {
  //     await db
  //       .collection("users")
  //       .updateOne(
  //         { _id: new ObjectId(userId) },
  //         { $addToSet: { cartItems: productId } }
  //       ); // addToSet - no duplicates
  //   }
  //   await db
  //     .collection("users")
  //     .updateOne(
  //       { _id: new ObjectId(userId) },
  //       { $pull: { cartItems: productId } }
  //     );
  // }
  //!! authenticateToken()
  // const authenticateToken = (req, res, next) => {
  //   const token = req.headers["authorization"];
  //   if (token == null) return res.send(401);

  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.send(403);
  //     req.user = user;
  //     next();
  //   });
  // };

  // get products
  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  });

  // app.post("/api/users", async (req, res) => {
  //   const userId = req.body.userId;

  //   const user = await db
  //     .collection("users")
  //     .findOne({ _id: new ObjectId(userId) });

  //   return user;
  // });

  // get the cart
  app.get("/api/users/:userId/cart", async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.userId) });

    if (user.cartItems == null) {
      res.json({ message: "The cart is empty" });
    }

    const populatedCart = await populatedCartIds(user.cartItems);

    res.json(populatedCart);
  });

  app.get("/api/products/:productID", async (req, res) => {
    const productID = req.params.productID;

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productID) });

    const newViews = ++product.views;

    await db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(productID) },
        { $set: { views: newViews } }
      );

    res.json(product);
  });

  // add to cart
  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    const productIsInStock = await isInStock(productId);
    if (!productIsInStock) {
      return res.json({ error: "The product is not in stock" });
    }

    // await updateUserCartById(userId, productId, true);

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: {
          cartItems: {
            productId: new ObjectId(productId),
            quantity: quantity,
          },
        },
      }
    );

    // const user = findUserByInput(userId, true);

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    const populatedCart = await populatedCartIds(user.cartItems);
    res.json({ success: "Product successfully added", populatedCart });
  });

  // delete from cart
  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { cartItems: { productId: new ObjectId(productId) } } }
      );

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    const populatedCart = await populatedCartIds(user.cartItems);

    res.json(populatedCart);
  });

  // Add products From Admin Panel
  app.post("/api/admin/products/add", async (req, res) => {
    const { name, description, price, oldPrice, isInStock, image, quantity } =
      req.body;

    if (!name || !description || !price || !oldPrice || !isInStock || !image) {
      return res.json({ error: "Missing Fiels" });
    }

    const currentDate = new Date();

    try {
      const newProduct = Products({
        created: currentDate,
        name: name,
        price: price,
        oldPrice: oldPrice,
        description: description,
        isInStock: isInStock,
        quantity: quantity,
        image: image,
        views: "0",
      });

      await newProduct.save();
      return res.json({ message: "Product Added Successfully" });
    } catch (e) {
      return res.json({ error: e.message });
    }
  });

  // Log in User
  app.post("/api/users/get", async (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    try {
      if (!userEmail || !userPassword)
        return res.json({ error: "All fields are required" });

      const userDb = await db.collection("users").findOne({ email: userEmail });

      if (userDb == null) {
        return res.json({ error: "User with this email does not exist" });
      }

      const isMatch = await bcrypt.compare(userPassword, userDb.password);

      if (!isMatch) {
        return res.json({ error: "Wrong email or password" });
      }

      const token = jwt.sign(
        { id: userDb._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({
        token,
        user: {
          id: userDb._id,
          username: userDb.username,
          userlastname: userDb.userlastname,
          email: userDb.email,
          isAdmin: userDb.isAdmin,
          shippingAddress: userDb.shippingAddress,
        },
        message: "User successfuly logged in",
      });
    } catch (e) {
      return res.json({ error: e.message });
    }
  });

  // Register User
  app.post("/api/users/add", async (req, res) => {
    const { userName, userLastName, userEmail, userPassword, userPhone } =
      req.body;

    const { street, city, state, zip } = req.body.shippingAddress;

    const currentDate = new Date();

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    try {
      // const user = await findUserByInput(userEmail, false);

      if (
        !userName ||
        !userLastName ||
        !userPassword ||
        !userEmail ||
        !userPhone
      ) {
        // console.log("All fields are required");
        return res.json({ error: "All fields are required" });
      }

      const firstAttemptUserDb = await db
        .collection("users")
        .findOne({ email: userEmail });

      if (firstAttemptUserDb !== null) {
        // console.log("User wit this email already exists");
        return res.json({ error: "User with this email already exists" });
      }

      const newUser = new User({
        username: userName,
        userlastname: userLastName,
        email: userEmail,
        phone: userPhone,
        password: hashedPassword,
        isAdmin: false,
        historyOfPurchase: [],
        shippingAddress: {
          street: street,
          city: city,
          state: state,
          zip: zip,
        },
        cartItems: [],
        emailsSent: [],
        created: currentDate,
      });

      await newUser.save();

      const secondAttemptUserDb = await db
        .collection("users")
        .findOne({ email: userEmail });

      const token = jwt.sign(
        { id: secondAttemptUserDb._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        token,
        user: {
          id: secondAttemptUserDb._id,
          username: secondAttemptUserDb.username,
          userlastname: secondAttemptUserDb.userlastname,
          email: secondAttemptUserDb.email,
          isAdmin: secondAttemptUserDb.isAdmin,
          shippingAddress: secondAttemptUserDb.shippingAddress,
        },
        message: "User successfuly logged in",
      });

      //res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
      // console.log("error");
      res.json({ error: error.message });
    }
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://localhost:8080/success",
      cancel_url: "https://localhost:8080/cancel",
    });

    res.json({ id: session.id });
  });

  app.get("/success", (req, res) => {
    res.send("Success");
  });

  app.get("/cancel", (req, res) => {
    res.send("Cancel");
  });

  app.post("/api/:userId/contact-us", async (req, res) => {
    const { userId } = req.params;
    const { fullname, email, subject, message } = req.body;

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (user == null) {
      return res.json({ error: "The user does not exist" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., Gmail, Outlook, etc.
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "edward885788@gmail.com", // Your email address
        pass: "bzmj wlrd tifl ceid", // Your email password
      },
    });

    // Define the email options
    const mailOptions = {
      from: {
        name: "Empire TCG",
        address: "empire-tcg.com",
      }, // Sender address
      to: "ash@empire-tcg.com", // List of receivers
      subject: subject, // Subject line
      text: `Hello Ashot. This is a test email just to see if everything works and you receive customer's message. Here are the details from the form (this is also saved in the database): ${fullname}, ${email}, ${subject}, ${message}`, // Plain text body
      html: `<h2>I can send html. I duplicate the inputs from the form: </h2> <b>name: ${fullname}, useremail: ${email}, subject: ${subject}, message: ${message}</b>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({
          error: "Error occured while trying to send an email",
        });
      }
      // if no error and return status of OK
      user.updateOne({
        $push: {
          emailsSent: {
            fullname: fullname,
            email: email,
            subject: subject,
            message: message,
            created: Date.now,
          },
        },
      });
    });

    return res.json({ success: "user is found and data is provided" });
  });
}

start();
