// // import "@shopify/shopify-app-remix/adapters/node";
// // import {
// //   ApiVersion,
// //   AppDistribution,
// //   shopifyApp,
// // } from "@shopify/shopify-app-remix/server";
// // import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// // import prisma from "./db.server.js";

// // // import dotenv from "dotenv";
// // // dotenv.config({ path: "../.env" });  // Ensure it loads from the root directory

// // const shopify = shopifyApp({
// //   apiKey: "67ac1ef823b5d331807bd8d09929620c",
// //   apiSecretKey: "83ef6baf7680e312ce80833da777fe60" || "",
// //   apiVersion: ApiVersion.October24,
// //   scopes: "read_products,write_products".split(","),
// //   appUrl: "https://abu-bloomberg-remove-oldest.trycloudflare.com/" || "",
// //   authPathPrefix: "/auth",
// //   sessionStorage: new PrismaSessionStorage(prisma),
// //   distribution: AppDistribution.AppStore,
// //   future: {
// //     unstable_newEmbeddedAuthStrategy: true,
// //     removeRest: true,
// //   },
// //   ...(process.env.SHOP_CUSTOM_DOMAIN
// //     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
// //     : {}),
// // });

// // // const shopify = shopifyApp({
// // //   apiKey: process.env.SHOPIFY_API_KEY,
// // //   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
// // //   apiVersion: ApiVersion.October24,
// // //   scopes: process.env.SCOPES?.split(","),
// // //   appUrl: process.env.SHOPIFY_APP_URL || "",
// // //   authPathPrefix: "/auth",
// // //   sessionStorage: new PrismaSessionStorage(prisma),
// // //   distribution: AppDistribution.AppStore,
// // //   future: {
// // //     unstable_newEmbeddedAuthStrategy: true,
// // //     removeRest: true,
// // //   },
// // //   ...(process.env.SHOP_CUSTOM_DOMAIN
// // //     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
// // //     : {}),
// // // });

// // export default shopify;
// // export const apiVersion = ApiVersion.October24;
// // export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// // export const authenticate = shopify.authenticate;
// // export const unauthenticated = shopify.unauthenticated;
// // export const login = shopify.login;
// // export const registerWebhooks = shopify.registerWebhooks;
// // export const sessionStorage = shopify.sessionStorage;

// import "@shopify/shopify-app-remix/adapters/node";
// import {
//   ApiVersion,
//   AppDistribution,
//   shopifyApp,
// } from "@shopify/shopify-app-remix/server";
// import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";
// import mongoose from "mongoose";
// import express from "express";
// const app = express();
// app.use(express.json());

// // MongoDB connection
// const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://meet:meet123@cluster0.g0fbads.mongodb.net/FAQ?retryWrites=true&w=majority";

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB Connected for Session Storage"))
//   .catch(err => console.error("MongoDB Connection Error:", err));

// // Use a different variable name to avoid conflicts
// const mongoSessionStorage = new MongoDBSessionStorage(MONGO_URI, "FAQ");

// const shopify = shopifyApp({
//   apiKey: process.env.SHOPIFY_API_KEY || "67ac1ef823b5d331807bd8d09929620c",
//   apiSecretKey: process.env.SHOPIFY_API_SECRET || "83ef6baf7680e312ce80833da777fe60",
//   apiVersion: ApiVersion.October24,
//   scopes: (process.env.SCOPES || "read_products,write_products").split(","),
//   appUrl: process.env.SHOPIFY_APP_URL || "https://abu-bloomberg-remove-oldest.trycloudflare.com/",
//   authPathPrefix: "/auth",
//   sessionStorage: mongoSessionStorage, // Use the renamed variable
//   distribution: AppDistribution.AppStore,
//   isEmbeddedApp: true,
//   future: {
//     unstable_newEmbeddedAuthStrategy: true,
//     removeRest: true,
//   },
//   ...(process.env.SHOP_CUSTOM_DOMAIN
//     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
//     : {}),
// });


// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     `frame-ancestors 'self' https://${process.env.SHOPIFY_APP_URL}.myshopify.com;`
//   );
//   res.setHeader(
//     "Content-Security-Policy",
//     "sandbox allow-scripts allow-forms allow-same-origin allow-popups allow-downloads"
//   );
//   res.setHeader(
//     "Content-Security-Policy",
//     "connect-src 'self' https://cdn.shopify.com https://*.shopifycloud.com;"
//   );
//   next();
// });


// // Export authentication-related functions
// export default shopify;
// export default app;
// export const apiVersion = ApiVersion.October24;
// export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// export const authenticate = shopify.authenticate;
// export const unauthenticated = shopify.unauthenticated;
// export const login = shopify.login;
// export const registerWebhooks = shopify.registerWebhooks;
// export const sessionStorage = mongoSessionStorage; // Use the renamed variable here too


import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";
import express from "express";

<<<<<<< HEAD
const app = express();
app.use(express.json());

// MongoDB connection with session storage
=======


// MongoDB connection
>>>>>>> 410db93e735bc68501a4d6ed3984907bed74a6bd
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://meet:meet123@cluster0.g0fbads.mongodb.net/FAQ?retryWrites=true&w=majority";

let mongoSessionStorage;

try {
  mongoSessionStorage = new MongoDBSessionStorage(MONGO_URI, "FAQ");
  console.log("✅ MongoDB Connected for Session Storage");
} catch (error) {
  console.error("❌ MongoDB Session Storage Error:", error);
  process.exit(1);  // Exit the app on connection failure
}

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY || "67ac1ef823b5d331807bd8d09929620c",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "83ef6baf7680e312ce80833da777fe60",
  apiVersion: ApiVersion.October24,
  scopes: (process.env.SCOPES || "read_products,write_products").split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "https://abu-bloomberg-remove-oldest.trycloudflare.com/",
  authPathPrefix: "/auth",
  sessionStorage: mongoSessionStorage,
  distribution: AppDistribution.AppStore,
  isEmbeddedApp: true,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

// Unified CSP headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    `frame-ancestors 'self' https://${process.env.SHOPIFY_APP_URL}.myshopify.com; ` +
    `sandbox allow-scripts allow-forms allow-same-origin allow-popups allow-downloads; ` +
    `connect-src 'self' https://cdn.shopify.com https://*.shopifycloud.com;`
  );
  next();
});

export default app;  // Export Express app
export { shopify };   // Named export for Shopify instance
export const apiVersion = ApiVersion.October24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
<<<<<<< HEAD
export const sessionStorage = mongoSessionStorage;
=======
export const sessionStorage = mongoSessionStorage; 
>>>>>>> 410db93e735bc68501a4d6ed3984907bed74a6bd
