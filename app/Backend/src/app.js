import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

import categoryRouter from "../src/Routes/category.route.js";
import masterDBRouter from "../src/Routes/masterDB.route.js";
import faqRouter from "../src/Routes/FAQ.route.js";
import ratingRouter from "../src/Routes/rating.route.js"

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  credentials: true, // Allow cookies if needed
}));


// app.use(cors())

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// app.use(async (req, res, next) => {
//   const session = await shopify.api.session.getCurrentSession(req, res);
//   if (session) {
//     res.locals.shopifySession = session;
//   }
//   next();
// });

app.use("/api/category", categoryRouter);
app.use("/api/masterDB", masterDBRouter);
app.use("/api/faq", faqRouter);
app.use("/api/rating", ratingRouter);

export { app };
