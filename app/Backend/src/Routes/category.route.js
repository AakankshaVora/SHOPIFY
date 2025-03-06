import express from "express";
import {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/all-category/:storeId", getAllCategories); 
router.get("/get-category/:id", getCategoryById); 
router.put("/update-category/:id", updateCategory); 
router.delete("/delete-category/:id", deleteCategory); 

export default router