import express from "express";
import{
  fetchAndSaveStoreDetails,
  verifyShopifySession
} from "../controllers/masterDB.controller.js"

const router = express.Router();

router.post("/save-store", verifyShopifySession ,fetchAndSaveStoreDetails);

export default router;