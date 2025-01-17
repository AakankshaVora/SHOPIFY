import express from "express";
import{
   addRating,
   getAverageRatingFAQ,
   getRatingForFAQ,
   updateRating
} from "../controllers/rating.controller.js"

const router = express.Router();

router.post("/add-Rating", addRating);
router.get("/get-faq-rating", getRatingForFAQ); 
router.put("/get-avg-rating", getAverageRatingFAQ); 
router.delete("/update-rating", updateRating);

export default router;