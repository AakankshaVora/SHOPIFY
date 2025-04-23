import express from "express";
import{
   addRating,
   getAverageRatingFAQ,
   getRatingForFAQ,
   updateRating,
   deleteRating
} from "../controllers/rating.controller.js"

const router = express.Router();

router.post("/add-Rating/:FAQId", addRating);
router.get("/get-faq-rating/:FAQId", getRatingForFAQ); 
router.put("/get-avg-rating", getAverageRatingFAQ); 
router.delete("/delete-rating/:ratingId", deleteRating);
router.put("/update-rating/:ratingId", updateRating);

export default router;