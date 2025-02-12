import express from "express";
import{
  fetchAndSaveStoreDetails
} from "../controllers/masterDB.controller.js"

const router = express.Router();

router.post("/save-store", fetchAndSaveStoreDetails);

export default router;