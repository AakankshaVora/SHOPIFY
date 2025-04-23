import { Rating } from "../models/Rating.model.js";
import { FAQ } from "../models/FAQ.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

export const addRating = asyncHandler(async (req, res) => {
  const { FAQId } = req.params;
  console.log(FAQId);

  const { customerId, comment, rating } = req.body;

  const faq = await FAQ.findById({ _id: FAQId });

  if (!faq) {
    throw new ApiError(400, "FAQ not found");
  }

  const newRating = new Rating({
    FAQId,
    customerId,
    rating,
    comment,
  });

  await newRating.save();

  res
    .status(200)
    .json(new ApiResponse(200, newRating, "Rating Posted Successfully"));
});

export const getRatingForFAQ = asyncHandler(async (req, res) => {
  const { FAQId } = req.params;
  console.log(FAQId);

//   const rating = await Rating.findOne({ FAQId: new mongoose.Types.ObjectId(FAQId) });


  const result = await FAQ.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(FAQId) } },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "FAQId",
        as: "ratings",
      },
    },
  ]);

  if (result.length === 0) {
    throw new ApiError(404, "FAQ not found");
  }

  const faqWithRatings = result[0]; 

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        faqWithRatings,
        "FAQ and Ratings Fetched Successfully"
      )
    );
});

export const getAverageRatingFAQ = asyncHandler(async (req, res) => {
  try {
    const { FAQId } = req.params;

    const result = await Rating.aggregate([
      {
        $match: {
          FAQId: FAQId,
        },
      },
      {
        $group: {
          _id: "$FAQId",
          getAverageRating: { $avg: "$rating" },
          totalRating: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      throw new ApiError(404, "No rating found for this FAQ.");
    }
    res.status(200).json(new ApiResponse(200, result[0], "Average Rating"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Server error while fetching Average ratings.");
  }
});

export const updateRating = asyncHandler(async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { rating, comment } = req.body;
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { rating, comment },
      { new: true }
    );

    if (!updatedRating) {
      throw new ApiError(404, "Rating not Updated");
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedRating, "Rating Updated Successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Server error while updating ratings.");
  }
});

export const deleteRating = asyncHandler(async (req, res) => {
    try {
      const { ratingId } = req.params;
  
      const deletedRating = await Rating.findByIdAndDelete(ratingId);
  
      if (!deletedRating) {
        throw new ApiError(404, "Rating not found");
      }
  
      res
        .status(200)
        .json(new ApiResponse(200, deletedRating, "Rating deleted successfully"));
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Server error while deleting rating.");
    }
  });
  

// export const getRatingForStore = asyncHandler(async(req,res) =>{
//     try{
//         const { storeId } = req.query;

//     }catch(error){

//     }
// })
