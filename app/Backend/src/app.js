import express from "express";
import cors from "cors";
import cookieParser  from "cookie-parser";
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

import categoryRouter from "../src/Routes/category.route.js"

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser())


app.use("/api/category", categoryRouter);


export { app }