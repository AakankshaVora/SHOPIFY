import Rating from "../models/Rating.model.JS"
import { FAQ } from "../models/FAQ.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

export const addRating = asyncHandler(async (req, res) => {
    try {
        const { FAQId } = req.params;

        const { storeId, customerId, comment, rating } = req.body

        const faq = await FAQ.findById({ _id: FAQId });

        if (!faq) {
            throw new ApiError(400, "FAQ not found")
        }

        const newRating = new Rating({
            FAQId,
            customerId,
            rating,
            comment,
            storeId
        });

        await newRating.save();

        res.status(200).json(
            new ApiResponse(200, newRating, "Rating Posted Successfully")
        )
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error")
    }
});

export const getRatingForFAQ = asyncHandler(async (req, res) => {
    try {
        const { FAQId } = req.params

        const rating = await Rating.findById({ _id: FAQId })

        if (rating.length === 0) {
            throw new ApiError(400, "No Rating Found For This FAQ")
        }

        res.status(200).json(
            new ApiResponse(200, rating, "Rating Fetched Successfully")
        )
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Server error while fetching ratings.")
    }

});

export const getAverageRatingFAQ = asyncHandler(async (req, res) => {
    try {

        const { FAQId } = req.params;

        const result = await Rating.aggregate([
            {
                $match: {
                    FAQId: FAQId
                }
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
        res.status(200)
            .json(
                new ApiResponse(200, result[0], "Average Rating")
            )

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Server error while fetching Average ratings.")
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

        if(!updatedRating){
            throw new ApiError(404,"Rating not Updated")
        }

        res.status(200)
           .json(
             new ApiResponse(200,updatedRating,"Rating Updated Successfully")
           )

    } catch (error) {

        console.error(error);
        throw new ApiError(500, "Server error while updating ratings.")

    }
});

// export const getRatingForStore = asyncHandler(async(req,res) =>{
//     try{
//         const { storeId } = req.query;
        
//     }catch(error){

//     }
// })