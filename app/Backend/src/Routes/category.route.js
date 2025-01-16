import express from "express";
import {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/category/:id", getCategoryById); 
router.put("/category/:id", updateCategory); 
router.delete("/category/:id", deleteCategory); 

export default router