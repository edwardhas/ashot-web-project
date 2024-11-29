import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { WebSocketServer } from "ws";
import { Server } from "socket.io";
import { MongoClient, ObjectId } from "mongodb";
import {
  User,
  Products,
  UserActivity,
  Discount,
  RecentlyViewedProducts,
} from "./schema.js";
// import { error } from "console";
import nodemailer from "nodemailer";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import helmet from "helmet";
import cors from "cors";
import cohere from "cohere-ai";
import bodyParser from "body-parser";
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
      },
    })
  );

  app.use(
    cors({
      origin: "https://localhost:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization", "users-active"],
      credentials: true,
    })
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const assetsDir = path.join(__dirname, "../assets");

  app.use("/images", express.static(path.join(assetsDir)));

  const options = {
    key: fs.readFileSync("../certs/server.key"),
    cert: fs.readFileSync("../certs/server.cert"),
  };
  // C:\Users\edwar\OneDrive\Desktop\COPY OF ASHOT WEB PROJECT\v2\COPY-ashot-web-project-COPY\certs\server.csr
  const server = https.createServer(options, app);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // const wss = new WebSocketServer({ server });

  let activeUsers = 0;

  const io = new Server(server, {
    cors: {
      origin: "https://localhost:8080",
      methods: ["GET", "POST"],
      // allowedHeaders: ["users-active"],
      credentials: true, // enables cookies for authentication
    },
    pingInterval: 25000, // Send a ping every 25 seconds (default is 25 seconds)
    pingTimeout: 5000, // Disconnect if no ping within 5 seconds (default is 60 seconds)
  });

  const onlineUsers = new Map();
  const viewedProducts = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Authenticate socket connection using JWT
    socket.on("authenticate", async ({ token }) => {
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Use your secret key
        const userId = decoded.id; // Assuming the JWT contains the userId

        // Save user ID to track by socket ID
        onlineUsers.set(socket.id, userId);

        // Update user status in the database
        await User.findByIdAndUpdate(userId, { isOnline: true });

        // Broadcast updated users
        const onlineUserList = await User.find({ isOnline: true });
        io.emit("updateOnlineUsers", onlineUserList);
      } catch (error) {
        console.error("Authentication error:", error);
        socket.disconnect();
      }
    });

    // socket.on("viewProduct", (product) => {
    //   console.log(product);
    //   if (!product || Object.keys(product).length === 0) {
    //     return;
    //   }

    //   io.emit("productViewed", { product: product });
    // });

    socket.on("viewProduct", (product) => {
      if (!product || Object.keys(product).length === 0) {
        return;
      }

      // Store the full product object in the Map, using the product ID as the key
      viewedProducts.set(product._id, product);

      // Emit the updated list of currently viewed products to all clients
      io.emit("productViewed", {
        productList: Array.from(viewedProducts.values()),
      });
    });

    // Optional: Listen for when a user stops viewing a product
    socket.on("stopViewingProduct", (productId) => {
      if (viewedProducts.has(productId)) {
        viewedProducts.delete(productId);

        // Emit the updated list of currently viewed products
        io.emit("productViewed", {
          productList: Array.from(viewedProducts.values()),
        });
      }
    });

    // Periodically send the list of currently viewed products to clients
    // setInterval(() => {
    //   io.emit("productViewed", {
    //     productList: Array.from(viewedProducts.values()),
    //   });
    // }, 30000);

    // Handle user disconnect
    socket.on("disconnect", async () => {
      console.log("A user disconnected:", socket.id);

      // Retrieve and remove the user ID from the map
      const userId = onlineUsers.get(socket.id);
      if (userId) {
        onlineUsers.delete(socket.id);

        // Update the user's status in the database
        await User.findByIdAndUpdate(userId, { isOnline: false });

        // Broadcast the updated list of online users
        const onlineUserList = await User.find({ isOnline: true });
        io.emit("updateOnlineUsers", onlineUserList);
      }
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

  const categorizeTransactions = (transactions) => {
    const weeks = [[], [], [], []];
    transactions.forEach((transaction) => {
      const date = new Date(transaction.created * 1000); // Stripe timestamps are in seconds
      const weekNumber = Math.floor((date.getDate() - 1) / 7);
      weeks[weekNumber].push(transaction.amount / 100); // Convert amount to dollars
    });

    return weeks.map((week, index) => ({
      week: `Week ${index + 1}`,
      total: week.reduce((sum, amount) => sum + amount, 0),
    }));
  };

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
  }

  async function isInStock(id) {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    return product.isInStock;
  }

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatMonth = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensure month is two digits
    return `${year}-${month}`; // Format as YYYY-MM
  };

  async function fetchOpenAIResponse(prompt) {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003", // Choose the model you need
          prompt: prompt,
          max_tokens: 100,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Check if choices array exists and has at least one item
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].text;
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      return "An error occurred while fetching the response.";
    }
  }

  const updateUserActivity = async (userId) => {
    try {
      const currentDate = new Date();
      const currentDay = new Date(currentDate.setUTCHours(0, 0, 0, 0)); // Start of today
      const currentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ); // First day of the month

      const user = await User.findById(userId);

      // Update lastActiveDate
      user.lastActiveDate = currentDay;

      // Update dailyActiveDates (only add if the date is not already present)
      if (
        !user.dailyActiveDates.some(
          (date) => date.getTime() === currentDay.getTime()
        )
      ) {
        user.dailyActiveDates.push(currentDay);
      }

      // Update monthlyActiveDates (only add if the date is not already present)
      if (
        !user.monthlyActiveDates.some(
          (date) => date.getTime() === currentMonth.getTime()
        )
      ) {
        user.monthlyActiveDates.push(currentMonth);
      }

      await user.save();
    } catch (error) {
      console.error("Error updating user activity:", error);
    }
  };

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

    res.json({ products: products });
  });

  app.get("/api/users/online", async (req, res) => {
    try {
      const onlineUsers = await User.find({ isOnline: true });
      res.json({ count: onlineUsers.length, users: onlineUsers });
    } catch (error) {
      res.json({ error: "Error fetching online users." });
    }
  });

  app.get("/api/products/paginated", async (req, res) => {
    try {
      const products = await db.collection("products").find({}).toArray(); // Fetch all products from MongoDB
      const limit = 20; // Number of products per page
      const productsArray = [];

      for (let i = 0; i < products.length; i += limit) {
        const page = {};
        const pageProducts = products.slice(i, i + limit); // Get 20 products for this page

        // Map each product to a numbered key in the object
        pageProducts.forEach((product, index) => {
          page[index] = product;
        });

        productsArray.push(page);
      }
      updateUserActivity();
      res.json({ paginatedProducts: productsArray });
    } catch (error) {
      res.json({ error: "Error fetching products", error });
    }
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
      const userName = users[i].username;
      const userLastName = users[i].userlastname;
      const emailsAndIds = {
        id: userId,
        userName: userName,
        userLastName: userLastName,
        emails: user,
      };
      if (user.length > 0) {
        // arrayOfUsersEmails.push(user);
        // userIds.push(userId);
        emailsAndIds.id = userId;
        emailsAndIds.emails = user;
        emailsAndIds.userName = userName;
        emailsAndIds.userLastName = userLastName;
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

  // !! GET CART
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

  app.get("/api/users/:userId/cartQuantity", async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.userId) });

    if (user.cartItems == null) {
      res.json({ message: "The cart is empty" });
    }

    res.json(user.cartItems.quantity);
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

  //!! REQUEST THE AMOUNT OF USERS ACTIVE IN ADMIN PAGE
  app.get("/api/admin/page/users-active", (req, res) => {
    res.json({ activeUsers: activeUsers });
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
        productImages,
      } = req.body;

      const originalProperties = {
        name: productName.toString(),
        description: productDescription.toString(),
        quantity: Number(productQuantity),
        price: productPrice.toString(),
        oldPrice: productOldPrice.toString(),
        isInStock: Boolean(productIsInStock),
        images: productImages,
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
        return res.json({
          error: "Ashot Brat Please Make Changes first and then submit",
        });
      }

      async function updateProducts(updates, productId) {
        for (const update of updates) {
          const filter = { _id: new ObjectId(productId) };
          // const filter = { [update.key]: update.product };
          const updateDoc = {
            $set: { [update.key]: update.originalProperties },
          };
          try {
            const result = await db
              .collection("products")
              .updateOne(filter, updateDoc);
          } catch (error) {
            res.json({ error: "Error Adding Changes" });
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
    // console.log(email);
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
    try {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
      const existingCartItem = user.cartItems.find(
        (item) => item.productId.toString() === productId
      );

      if (existingCartItem) {
        // If the product already exists, update the quantity
        await db.collection("users").updateOne(
          {
            _id: new ObjectId(userId),
            "cartItems.productId": new ObjectId(productId),
          },
          {
            $inc: { "cartItems.$.quantity": quantity },
          }
        );
      } else {
        // If the product does not exist, add it to the cart
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
      }
    } catch (error) {
      res.json({ error: error });
    }

    // const user = findUserByInput(userId, true);

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    const populatedCart = await populatedCartIds(user.cartItems);
    res.json({ success: "Product successfully added", populatedCart, user });
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

    res.json({ populatedCart, user });
  });

  //!! ADD PRODUCTS FROM ADMIN PANEL
  app.post("/api/admin/products/add", async (req, res) => {
    const {
      name,
      description,
      price,
      oldPrice,
      isInStock,
      generation,
      type,
      stage,
      rarity,
      images,
      quantity,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !oldPrice ||
      !isInStock ||
      !generation ||
      !type ||
      !rarity ||
      !stage ||
      !images.length
    ) {
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
        generation: generation,
        type: type,
        stage: stage,
        rarity: rarity,
        isInStock: isInStock,
        quantity: quantity,
        images: images,
        views: "0",
      });

      await newProduct.save();
      return res.json({ success: "Product Added Successfully" });
    } catch {
      return res.json({ error: "Error Occured While Adding Product" });
    }
  });

  //!! ADD BEST DEAL FROM ADMIN PANEL
  app.post("/api/admin/deal/add", async (req, res) => {
    // Get data
    const {
      name,
      price,
      oldPrice,
      description,
      imageUrls,
      generation,
      type,
      stage,
      rarity,
    } = req.body;

    try {
      const now = new Date();
      const dealEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

      const deal = {
        timestamp: now,
        name: name,
        price: price,
        oldPrice: oldPrice,
        description: description,
        generation: generation,
        type: type,
        stage: stage,
        rarity: rarity,
        imageUrl: imageUrls,
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
  app.post("/api/login", async (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    try {
      if (!userEmail || !userPassword)
        return res.json({ error: "All fields are required" });

      const userDb = await db.collection("users").findOne({ email: userEmail });
      if (userDb == null || undefined) {
        return res.json({ error: "User with this email does not exist" });
      }
      const isMatch = await bcrypt.compare(userPassword, userDb.password);

      if (!isMatch) {
        return res.json({ error: "Wrong email or password" });
      }
      const token = jwt.sign(
        { id: userDb._id },
        process.env.ACCESS_TOKEN_SECRET
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
          cartItems: userDb.cartItems,
        },
        success: "User successfuly logged in",
      });
    } catch (e) {
      return res.json({ error: e.message });
    }
  });

  //!! REGISTER USER
  app.post("/api/register", async (req, res) => {
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
        activity: {
          lastActiveDate: Date.now(),
          dailyActiveDates: [],
          monthlyActiveDates: [],
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
        process.env.ACCESS_TOKEN_SECRET
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
        success: "User successfuly logged in",
      });

      //res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
      // console.log("error");
      res.json({ error: error.message });
    }
  });

  app.post("/api/track-activity", async (req, res) => {
    // let userId = req.body.userId;
    // // userId = new ObjectId(userId);
    // const currentDate = new Date();
    // const currentFormattedDate = formatDate(currentDate);
    // const currentFormattedMonth = formatMonth(currentDate); // Format the current month (YYYY-MM)
    // try {
    //   let userActivity = await UserActivity.findOne({ userId });
    //   if (!userActivity) {
    //     userActivity = new UserActivity({
    //       userId,
    //       dailyActiveDates: [currentFormattedDate],
    //       lastActive: currentDate,
    //     });
    //     await userActivity.save();
    //     return res.json({ message: "User activity tracked successfully." });
    //   }
    //   // Sanitize and format all dates in dailyActiveDates before comparing
    //   const formattedDailyActiveDates = userActivity.dailyActiveDates.map(
    //     (date) => formatDate(new Date(date))
    //   );
    //   // Check if the user has already been active today
    //   const alreadyActiveToday =
    //     formattedDailyActiveDates.includes(currentFormattedDate);
    //   // Sanitize and format all dates in monthlyActiveDates before comparing
    //   const formattedMonthlyActiveDates = userActivity.monthlyActiveDates.map(
    //     (month) => formatMonth(new Date(month))
    //   );
    //   // Check if the user has already been active this month (monthly)
    //   const alreadyActiveThisMonth = formattedMonthlyActiveDates.includes(
    //     currentFormattedMonth
    //   );
    //   if (!alreadyActiveToday) {
    //     // Add today's date to the array and update last active date
    //     userActivity.dailyActiveDates.push(currentFormattedDate);
    //     // userActivity.lastActive = currentDate;
    //     // await userActivity.save();
    //     // return res.json({ message: "User activity tracked successfully." });
    //   }
    //   // If the user has not been active this month, add this month to the monthlyActiveDates
    //   if (!alreadyActiveThisMonth) {
    //     userActivity.monthlyActiveDates.push(currentFormattedMonth); // Push this month's formatted date
    //   }
    //   // Update last active date
    //   userActivity.lastActive = currentDate;
    //   await userActivity.save();
    //   // If the user has already been active today, don't add them again
    //   res.json({ message: "User already tracked for today." });
    // } catch (error) {
    //   res.json({ message: "Error tracking user activity." });
    // }
    const { userId } = req.body; // Assuming the frontend sends userId
    const currentDate = new Date();
    const currentFormattedDate = formatDate(currentDate); // Format the current date (YYYY-MM-DD)
    const currentFormattedMonth = formatMonth(currentDate); // Format the current month (YYYY-MM)

    try {
      // Find the user's activity record
      let userActivity = await UserActivity.findOne({ userId });

      if (!userActivity) {
        // If no activity exists for the user, create a new record with today's date and month
        userActivity = new UserActivity({
          userId,
          dailyActiveDates: [currentDate], // Add the current date for daily tracking
          monthlyActiveDates: [currentDate], // Add the current month for monthly tracking
          lastActive: currentDate, // Full date for last activity
        });
        await userActivity.save();
        return res.status(200).json({
          message: "User activity tracked successfully (new record).",
        });
      }

      // DAILY ACTIVITY: Check if the user has been active today
      const alreadyActiveToday = userActivity.dailyActiveDates.some((date) => {
        return formatDate(date) === currentFormattedDate; // Compare only YYYY-MM-DD
      });

      // MONTHLY ACTIVITY: Check if the user has been active this month
      const alreadyActiveThisMonth = userActivity.monthlyActiveDates.some(
        (date) => {
          return formatMonth(date) === currentFormattedMonth; // Compare only YYYY-MM
        }
      );

      // If the user has not been active today, add today's date to dailyActiveDates
      if (!alreadyActiveToday) {
        userActivity.dailyActiveDates.push(currentDate); // Add current date
      }

      // If the user has not been active this month, add this month to monthlyActiveDates
      if (!alreadyActiveThisMonth) {
        userActivity.monthlyActiveDates.push(currentDate); // Add current date
      }

      // Update last active date
      userActivity.lastActive = currentDate;
      await userActivity.save();

      res.status(200).json({ message: "User activity tracked successfully." });
    } catch (error) {
      console.error("Error tracking user activity:", error);
      res.status(500).json({ message: "Error tracking user activity." });
    }
  });

  //!! ADMIN PANEL STATISTICS
  app.get("/api/daily-statistics", async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const dailyActiveUsers = await UserActivity.countDocuments({
      dailyActiveDates: { $elemMatch: { $gte: startOfDay } },
    });

    res.json({ dailyActiveUsers });
  });

  app.get("/api/monthly-statistics", async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const dailyActiveUsers = await UserActivity.countDocuments({
      dailyActiveDates: { $elemMatch: { $gte: startOfDay } },
    });

    res.json({ dailyActiveUsers });
  });

  app.get("/api/users-data-table", async (req, res) => {
    try {
      const users = await User.find();

      const formattedUsers = await Promise.all(
        users.map(async (user) => {
          return {
            ...user._doc,
            created: user.created
              ? new Date(user.created).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
              : "N/A",
            isOnline: user.isOnline ? "Online" : "Offline",
            cartItems: await populatedCartIds(user.cartItems),
          };
        })
      );
      res.json({ users: formattedUsers });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

  //!! STRIPE CHECKOUT SESSION
  app.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.images[0]],
          },
          unit_amount: product.price * 100, // convert to cents
        },
        quantity: product.quantity,
      };
    });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `https://localhost:8080/success`,
        cancel_url: `https://localhost:8080/cancel`,
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).send("Server error");
    }
  });

  //!! STRIPE WEBHOOKS
  const endpointSecret =
    "whsec_3ea0d009d6e3bf7f3bddc6f63c91ac71e5fdab1c0b235fea5d67e3fc25659edf";
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {
      res.status(200).send("Received");
      const sig = req.header["stripe-signature"];
      let event;
      console.log("ENDPOINT REACHED");
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        res.status(200).send("Received");
        console.log(event);
      } catch (error) {
        console.error("Webhook verification failed");
        res.status(400).send(`Webhook error: ${error.message}`);
      }

      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucceeded = event.data.object;
          console.log(paymentIntentSucceeded);
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      res.status(200).send("Received");
      res.json({ received: true });
    }
  );

  app.get("/api/transactions/today", async (req, res) => {
    try {
      const transactions = [];
      let hasMore = true;
      let startingAfter = null;

      // Get today's date
      const now = new Date();

      // Get the current day, month, and year
      const day = now.getDate();
      const month = now.getMonth(); // Zero-based month
      const year = now.getFullYear();

      // Calculate the start of today (00:00:00)
      const startOfDay = new Date(year, month, day, 0, 0, 0).getTime() / 1000; // Start of the day in seconds

      // Calculate the end of today (23:59:59)
      const endOfDay = new Date(year, month, day, 23, 59, 59).getTime() / 1000; // End of the day in seconds

      // Log the start and end times for debugging

      while (hasMore) {
        const params = {
          limit: 100, // Maximum allowed transactions per request
          created: {
            gte: startOfDay,
            lt: endOfDay,
          },
        };

        if (startingAfter) {
          params.starting_after = startingAfter; // For pagination
        }

        // Fetch transactions from Stripe
        const charges = await stripe.charges.list(params);

        // Add fetched data to the transactions array
        transactions.push(...charges.data);
        hasMore = charges.has_more;
        startingAfter = charges.data.length
          ? charges.data[charges.data.length - 1].id
          : null;
      }

      console.log(transactions);

      // const categorizedTransactions = categorizeTransactions(transactions);

      // res.json(categorizedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).send("Server Error");
    }
  });

  app.post("/api/transactions/picked-dates", async (req, res) => {
    const { created } = req.body;
    // Validate the input
    if (!created || !created.gte || !created.lte) {
      return res.json({ error: "Invalid date range provided." });
    }

    try {
      // Fetch charges from Stripe
      const charges = await stripe.charges.list({
        created: {
          gte: created.gte, // Start of the range
          lte: created.lte, // End of the range
        },
        status: "succeeded",
        limit: 100,
      });

      res.json({
        success: true,
        charges: charges.data, // Return the list of charges
      });
    } catch (error) {
      console.error("Error fetching charges:", error);
      res.json({ error: "Failed to fetch charges. Please try again later." });
    }
  });

  // app.get("/success", (req, res) => {
  //   res.send("Success");
  // });

  // app.get("/cancel", (req, res) => {
  //   res.send("Cancel");
  // });

  app.get("/api/get-users-email", async (req, res) => {
    try {
      const users = await User.find({}, "email");
      const emails = users.map((user) => user.email);
      res.json(emails);
    } catch (error) {
      res.json({ error: error.message });
    }
  });

  // !! POST product to the recentlyViewedProducts collection
  app.post(
    "/api/last-viewed-products/:productId/:userId/add",
    async (req, res) => {
      const { productId, userId } = req.params;

      const recentlyViewedProducts = new RecentlyViewedProducts({
        productId: productId,
        userId: userId,
      });

      await recentlyViewedProducts.save();
    }
  );

  //!! GET discounts
  app.get("/api/get-discounts", async (req, res) => {
    try {
      const DISCOUNTS = await Discount.find({});

      if (!DISCOUNTS) {
        res.json({ error: "Unable to send discounts" });
      }

      async function getDiscountsWithUserData() {
        const discounts = await db.collection("discounts").find().toArray(); // Retrieve all discounts

        // Populate user data for each discount
        const formattedDiscounts = await Promise.all(
          discounts.map(async (discount) => {
            const user = await db
              .collection("users")
              .findOne({ _id: discount.userId }); // Get user data
            return {
              ...discount,
              user, // Embed user data in place of userId
            };
          })
        );

        return formattedDiscounts;
      }

      const discounts = await getDiscountsWithUserData();
      res.json({ discounts: discounts });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

  app.delete("/api/delete-discount/:discountId", async (req, res) => {
    const { discountId } = req.params;
    await Discount.deleteOne({
      _id: new ObjectId(discountId),
    });

    const discounts = await Discount.find();

    res.json({ discounts: discounts });
  });

  //!! Generate Discount
  app.post("/api/generate-discount/:userId", async (req, res) => {
    const { userId } = req.params;
    const { discountCode, expirationDate } = req.body;
    const discountPercentage = Number(req.body.discountPercentage);

    if (!discountCode || !userId || !expirationDate || !discountPercentage) {
      return res.json({ error: "All fields are required." });
    }

    const now = new Date(Date.now());
    // from iso to regular format
    const formattedDate = now.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    });

    const expirationDateConverted = new Date(expirationDate);
    const formattedExpirationDate = expirationDateConverted.toLocaleString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      }
    );

    try {
      const userMatch = await User.find({ _id: userId });
      if (!userMatch) res.json({ error: "User does not exist" });

      const discount = new Discount({
        userId: userId,
        discountCode: discountCode,
        percentage: discountPercentage,
        expires: formattedExpirationDate,
        createdAt: formattedDate,
      });

      await discount.save();
      res.json({ success: "Discount Successfuly added!" });
    } catch (error) {
      res.json({ error: error.message });
    }
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

  // !! openAI
  app.post("/api/openAI/answer", async (req, res) => {
    // const question =
    //   "Based on the provided product data, can you tell me which product has the highest quantity and provide a detailed explanation of why?";

    const { question } = req.body;
    try {
      const productsData = await db.collection("products").find({}).toArray();

      let context = "";
      for (let i = 0; i < productsData.length; i++) {
        context += `Product Name: ${productsData[i].name} | Product Price: ${productsData[i].price} | Product Old Price: ${productsData[i].oldPrice} | Product Description: ${productsData[i].description} | Product Quantity: ${productsData[i].quantity} | Product Views: ${productsData[i].views} \n`;
      }

      const prompt = `${context}\n\nQuestion: ${question}\nAnswer:`;

      fetchOpenAIResponse(prompt)
        .then((response) => {
          console.log(response), res.json({ answer: response });
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
      res.json({ error: "An error occurred while processing the request." });
    }
  });
}

start();
