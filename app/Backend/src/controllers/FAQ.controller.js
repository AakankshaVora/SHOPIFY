import exp from "constants";
import { FAQ } from "../models/FAQ.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createFAQ = asyncHandler(async (req, res) => {
  try {
    const { storeId, categoryId, question, answer } = req.body;

    const category = await Category.findOne({ _id: categoryId, storeId });

    if (!category) {
      throw new ApiError(
        404,
        "Category not Found or dosen't belongs to this store."
      );
    }

    let answerUrl = answer;

    if (req.files && req.files.media) {
      const { media } = req.files;

      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          media.tempFilePath,
          {
            folder: "FAQ_MEDIA",
            resource_type: "auto",
          }
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
          throw new ApiError(500, "Failed to upload media.");
        }
 
        answerUrl = cloudinaryResponse.secure_url; // Store Cloudinary URL in answer field
      } catch (error) {
        throw new ApiError(500, "Failed to upload media.");
      }
    }

    const newFAQ = new FAQ({
      storeId,
      categoryId,
      question,
      answer: answerUrl,
    });

    await newFAQ.save();

    res
      .status(201)
      .json(new ApiResponse(200, newFAQ, "FAQ created Successfully."));
  } catch (error) {
    console.error("Error creating FAQ:", error);
    throw new ApiError(500, "Something went wrong while creating FAQ.");
  }
});

export const getFAQsByCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const faqs = await FAQ.find({ categoryId, isActive: true });
    if (faqs.length === 0) {
      throw new ApiError(404, "No FAQs found for this category.");
    }
    res
      .status(500)
      .json(
        new ApiResponse(
          200,
          faqs,
          "FAQs are fetched Successfully bassed on Category"
        )
      );
  } catch (error) {
    console.error("Error Fetching FAQ:", error);
    throw new ApiError(500, "Something went wrong while Fetching FAQ.");
  }
});

export const updateFAQ = asyncHandler(async (req, res) => {
  try {
    const { faqId } = req.params;
    const { question, answer, isActive } = req.body;

    const updateFAQ = await FAQ.findByIdAndUpdate(
      faqId,
      { question, answer, isActive },
      { new: true }
    );

    if (!updateFAQ) {
      throw new ApiError(404, "FAQ not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, updateFAQ, "FAQ Updated Successfully"));
  } catch (error) {
    console.error("Error Updating FAQ:", error);
    throw new ApiError(500, "Something went wrong while Updating FAQ.");
  }
});

export const deleteFAQ = asyncHandler(async (req, res) => {
  try {
    const { faqId } = req.params;
    const deleteFAQ = await FAQ.findByIdAndDelete(faqId);

    if (!deleteFAQ) {
      throw new ApiError(404, "FAQ not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, deleteFAQ, "FAQ deleted Successfully."));
  } catch (error) {
    console.error("Error delete FAQ:", error);
    throw new ApiError(500, "Something went wrong while Deleting FAQ.");
  }
});

export const getAllFAQForstore = asyncHandler(async (req, res) => {
  try {
    const { storeId } = req.query;
    const faqs = await FAQ.find({ storeId });

    if (faqs.length === 0) {
      throw new ApiError(404, "FAQ not found for this Store");
    }

    res
      .status(200)
      .json(new ApiResponse(200, faqs, "ALL FAQs are fetched for store"));
  } catch (error) {
    console.error("Error delete FAQ:", error);
    throw new ApiError(500, "Something went wrong while Fetching FAQ.");
  }
});

export const searchFAQ = asyncHandler(async (req, res) => {
  try {
    const { query, storeId } = req.query;
    const faqs = await FAQ.find({
      storeId,
      isActive: true,
      $or: [
        { question: { $regex: query, $options: "i" } },
        { answer: { $regex: query, options: "i" } },
      ],
    });

    if (faqs.length === 0) {
      throw new ApiError(404, "No FAQs matched based on your Search Query");
    }

    res
      .status(200)
      .json(new ApiResponse(200, faqs, "FAQS Searched Successfully."));
  } catch (error) {
    console.error("Error Searching FAQ:", error);
    throw new ApiError(500, "Something went wrong while Searching FAQ.");
  }
});

export const getFAQAnalytics = asyncHandler(async (req, res) => {
  try {
    const { storeId } = req.query;
    const totalFAQs = await FAQ.countDocuments({ storeId });
    const activeFAQs = await FAQ.countDocuments({ storeId, isActive: true });
    const inactiveFAQs = totalFAQs - activeFAQs;
    const topFAQs = await FAQ.find({ storeId })
      .sort({ viewCount: -1 })
      .limit(5);
    res
      .status(200)
      .json(new ApiResponse(200, totalFAQs, activeFAQs, inactiveFAQs, topFAQs));
  } catch (error) {
    console.error("Error Searching FAQ:", error);
    throw new ApiError(500, "Something went wrong while Searching FAQ.");
  }
});
