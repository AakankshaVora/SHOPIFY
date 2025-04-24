import express from "express";
import{
    createFAQ,
    getFAQsByCategory,
    updateFAQ,
    deleteFAQ,
    getAllFAQForstore,
    searchFAQ,
    getFAQAnalytics,
    getFaqCountForCategory,
    updateFAQByCategory,
    createFAQByCategory
} from "../controllers/FAQ.controller.js"

const router = express.Router();

router.post("/create", createFAQ);
router.get("/:categoryId", getFAQsByCategory); 
router.put("/update-faq/:faqId", updateFAQ); 
router.put("/update-faq/:categoryId/:faqId", updateFAQByCategory); 
router.delete("/delete-faq/:faqId", deleteFAQ);
router.get("/store", getAllFAQForstore);
router.get("/search",searchFAQ);
router.get("/analytics",getFAQAnalytics);
router.get("/count/:categoryId",getFaqCountForCategory);
router.post("/create-faq/:categoryId", createFAQByCategory);

export default router;