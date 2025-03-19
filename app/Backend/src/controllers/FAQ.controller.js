import exp from "constants";
import { FAQ } from "../models/FAQ.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { translateText } from "../utils/translate.js";
import mongoose from "mongoose";

export const createFAQ = asyncHandler(async (req, res) => {
  const { storeId, question, answer, answerType } = req.body;
  console.log("req.body", req.body);

  const cat = await Category.findOne({ storeId });

  const categoryId = cat._id;

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
    answerType,
  });

  await newFAQ.save();

  res
    .status(201)
    .json(new ApiResponse(200, newFAQ, "FAQ created Successfully."));
});

// export const getFAQsByCategory = asyncHandler(async (req, res) => {
//   const { categoryId } = req.params;
  
//   const faqs = await FAQ.find({ categoryId, isActive: true });  

//   if (faqs.length === 0) {
//     throw new ApiError(404, "No FAQs found for this category.");
//   }

//   const translatedFaqs = await Promise.all(
//     faqs.map(async (faq) => {
      
//       const translatedQuestion = await translateText(faq.question, "fr");
//       const translatedAnswer = await translateText(faq.answer, "fr");

//       console.log("translatedQuestion", translatedQuestion);
//       console.log("translatedAnswer", translatedAnswer);
      

//       faq.question = translatedQuestion;
//       faq.answer = translatedAnswer;
//     })
//   );

//   console.log(translatedFaqs);

//   res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         faqs,
//         "FAQs are fetched Successfully bassed on Category"
//       )
//     );
// });

export const getFAQsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { language } = req.query;  // Get language from query params, default to English

  const faqs = await FAQ.find({ categoryId, isActive: true });  

  if (faqs.length === 0) {
    throw new ApiError(404, "No FAQs found for this category.");
  }

  const translatedFaqs = await Promise.all(
    faqs.map(async (faq) => {
      const translatedQuestion = await translateText(faq.question, language);
      const translatedAnswer = await translateText(faq.answer, language);

      return {
        ...faq.toObject(),
        question: translatedQuestion,
        answer: translatedAnswer
      };
    })
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        translatedFaqs,
        "FAQs are fetched successfully based on Category"
      )
    );
});

export const updateFAQ = asyncHandler(async (req, res) => {
  const { faqId } = req.params;

  const faq = await FAQ.findById(faqId);
  let { question, answer } = req.body;

  if (!question) {
    question = faq.question;
  }

  if (!answer) {
    answer = faq.answer;
  }

  const updateFAQ = await FAQ.findByIdAndUpdate(
    faqId,
    { question, answer },
    { new: true }
  );

  if (!updateFAQ) {
    throw new ApiError(404, "FAQ not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updateFAQ, "FAQ Updated Successfully"));
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
  const { storeId } = req.query;
  const faqs = await FAQ.find({ storeId });

  if (faqs.length === 0) {
    throw new ApiError(404, "FAQ not found for this Store");
  }

  res
    .status(200)
    .json(new ApiResponse(200, faqs, "ALL FAQs are fetched for store"));
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

export const getFaqCountForCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate categoryId before querying
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId format.",
      });
    }

    const totalFAQs = await FAQ.countDocuments({
      categoryId: new mongoose.Types.ObjectId(categoryId),
    });

    return res.status(200).json({
      success: true,
      message: "FAQ count fetched successfully.",
      data: {
        categoryId,
        totalFAQs,
      },
    });
  } catch (error) {
    console.error("Error fetching FAQ count:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

export const updateFAQByCategory = asyncHandler(async (req, res) => {
  const { categoryId, faqId } = req.params;
  let { question, answer } = req.body;

  const faq = await FAQ.findOne({ _id: faqId, categoryId });
  if (!faq) {
    throw new ApiError(404, "FAQ not found in the given category");
  }

  // If question or answer is not provided, retain existing values
  question = question || faq.question;
  answer = answer || faq.answer;

  const updatedFAQ = await FAQ.findOneAndUpdate(
    { _id: faqId, categoryId },
    { question, answer },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedFAQ, "FAQ Updated Successfully"));
});
