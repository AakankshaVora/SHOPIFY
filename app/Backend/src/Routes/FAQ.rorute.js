import express from "express";
import{
    createFAQ,
    getFAQsByCategory,
    updateFAQ,
    deleteFAQ,
    getAllFAQForstore,
    searchFAQ,
    getFAQAnalytics
} from "../controllers/FAQ.controller.js"

const router = express.Router();

router.post("/create", createFAQ);
router.get("/category/:categoryId", getFAQsByCategory); 
router.put("/category/:faqId", updateFAQ); 
router.delete("/category/:faqId", deleteFAQ);
router.get("/store",getAllFAQForstore);
router.get("/search",searchFAQ);
router.get("/analytics",getFAQAnalytics);

export default router;