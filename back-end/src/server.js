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
import { v4 as uuid4 } from "uuid";
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

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
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

  //!! GET PRODUCTS
  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  });

  //!! GET EMAILS
  app.get("/api/emails", async (req, res) => {
    const users = await db.collection("users").find().toArray();
    let total = 0;
    const totalArray = [];

    const ALL_EMAILS_INFO = [];

    for (let i = 0; i < users.length; i++) {
      const user = await users[i].emailsSent;
      const userId = users[i]._id.toString();
      const emailsAndIds = {
        id: userId,
        emails: user,
      };
      if (user.length > 0) {
        // arrayOfUsersEmails.push(user);
        // userIds.push(userId);
        emailsAndIds.id = userId;
        emailsAndIds.emails = user;
        ALL_EMAILS_INFO.push(emailsAndIds);
      }
    }

    for (let i = 0; i < ALL_EMAILS_INFO.length; i++) {
      const email = ALL_EMAILS_INFO[i].emails;

      total += email.length;
    }

    for (let i = 0; i < total; i++) {
      totalArray.push(i);
    }
    /* 
      in the loop return an array of objects.
      because of scoping we need to store it in global variable (cover)
      we return the first element of the global array variable
      the first element contains all the emails
    */

    res.json({ emails: ALL_EMAILS_INFO, userEmailsTotal: totalArray });
  });

  // app.post("/api/users", async (req, res) => {
  //   const userId = req.body.userId;

  //   const user = await db
  //     .collection("users")
  //     .findOne({ _id: new ObjectId(userId) });

  //   return user;
  // });

  // !! GET THE CART
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

  // !! GET SINGLE PRODUCT
  app.get("/api/products/:productID", async (req, res) => {
    const productID = req.params.productID;

    if (!productID || productID.length != 24)
      return res.json({ error: "Incorrect Id" });

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productID) });

    if (product == null) return res.json({ error: "Incorrect Id" });

    const newViews = ++product.views;

    await db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(productID) },
        { $set: { views: newViews } }
      );

    res.json(product);
  });

  //!! GET THE SINGLE PRODUCT TO EDIT OR DELETE
  app.get(
    "/api/admin/panel/edit_delete_product/:productId",
    async (req, res) => {
      const productId = req.params.productId;

      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(productId) });

      res.json(product);
    }
  );

  //!! EDIT OR DELETE PRODUCT FROM ADMIN PAGE
  app.post(
    "/api/admin/panel/edit_delete_product/:productId",
    async (req, res) => {
      const productId = req.params.productId;
      const {
        productName,
        productDescription,
        productQuantity,
        productPrice,
        productOldPrice,
        productIsInStock,
        productImageUrl,
      } = req.body;

      const originalProperties = {
        name: productName.toString(),
        description: productDescription.toString(),
        quantity: Number(productQuantity),
        price: productPrice.toString(),
        oldPrice: productOldPrice.toString(),
        isInStock: Boolean(productIsInStock),
        image: productImageUrl.toString(),
      };

      if (productId.toString().length != 24)
        return res.json({ error: "Incorrect product ID" });

      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(productId) });

      function findNonMatchingValues(obj1, obj2) {
        const nonMatchingValues = [];

        // Iterate through keys in obj1
        for (const key in obj1) {
          if (obj1.hasOwnProperty(key)) {
            // Check if key exists in obj2 and if the values are different
            if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
              nonMatchingValues.push({
                key: key,
                originalProperties: obj1[key],
                product: obj2[key],
              });
            }
          }
        }

        return nonMatchingValues;
      }

      const result = findNonMatchingValues(originalProperties, product);

      if (result.length == 0) {
        return res.json({ error: "No Changes Were Made" });
      }

      async function updateProducts(updates, productId) {
        for (const update of updates) {
          const filter = { _id: new ObjectId(productId) };
          // const filter = { [update.key]: update.product };
          const updateDoc = {
            $set: { [update.key]: update.originalProperties },
          };
          console.log(filter, updateDoc);
          try {
            const result = await db
              .collection("products")
              .updateOne(filter, updateDoc);
          } catch (error) {
            console.error("Error updating: ", error);
          }
        }
      }

      updateProducts(result, productId);

      res.json({ success: "Product Updated Successfuly" });
    }
  );

  //!! GET THE SINGLE EMAIL FROM ADMIN PAGE
  app.get("/api/emails/:userId/:emailId", async (req, res) => {
    const emailId = req.params.emailId;
    const userId = req.params.userId;

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    const email = user.emailsSent.find(
      (email) => email.id.toString() === emailId
    );
    console.log(email);
    res.json(email);
  });

  //!! ADD TO CART
  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    const productIsInStock = await isInStock(productId);
    if (!productIsInStock) {
      return res.json({ error: "The Product Is Not In Stock" });
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

  // !! DELETE FROM CART
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

  //!! ADD PRODUCTS FROM ADMIN PANEL
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

  //!! ADD BEST DEAL FROM ADMIN PANEL
  app.post("/api/admin/deal/add", async (req, res) => {
    // Get data
    const { name, price, oldPrice, description, imageUrl } = req.body;

    try {
      const now = new Date();
      const dealEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

      const deal = {
        timestamp: now,
        name: name,
        price: price,
        oldPrice: oldPrice,
        description: description,
        imageUrl: imageUrl,
        endTimestamp: dealEnd,
      };

      await db.collection("dealOfTheWeek").insertOne(deal);
      res.json({ success: "Deal Added Successfully" });
    } catch (error) {
      res.json({ error: `Error Adding The Deal: ${error}` });
    }
  });

  //!! GET THE BEST DEAL
  app.get("/api/deal", async (req, res) => {
    try {
      const latestDeal = await db
        .collection("dealOfTheWeek")
        .find()
        .sort({ timestamp: -1 })
        .limit(1)
        .toArray();
      res.json(latestDeal[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //!! LOG IN USER
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

  //!! REGISTER USER
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

  //!! STRIPE CHECKOUT SESSION
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

  // !! REVEIVING EMAILS FROM USERS
  app.post("/api/:userId/contact-us", async (req, res) => {
    const { userId } = req.params;
    const { fullname, email, subject, message } = req.body;

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (user == null) {
      return res.json({ error: "The user does not exist" });
    }

    if (fullname == "" || email == "" || subject == "" || message == "") {
      return res.json({ error: "Incorrect inputs" });
    }

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: {
          emailsSent: {
            id: generateRandomId(),
            fullname: fullname,
            email: email,
            subject: subject,
            message: message,
            status: false,
            created: Date.now(),
          },
        },
      }
    );
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

    // !! Define the email options
    const mailOptions = {
      from: {
        name: "Empire TCG",
        address: "empire-tcg.com",
      }, // Sender address
      to: "marat885788@gmail.com", // List of receivers
      subject: subject, // Subject line

      html: `<h2>I can send html. I duplicate the inputs from the form: </h2> <b>name: ${fullname}, useremail: ${email}, subject: ${subject}, message: ${message}</b>`,
    };

    // !! Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({
          error: "Error occured while trying to send an email",
        });
      }
      // if no error and return status of OK
    });

    return res.json({ success: "user is found and data is provided" });
  });
}

start();
