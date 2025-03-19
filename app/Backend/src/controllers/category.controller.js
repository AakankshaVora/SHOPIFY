import { Category } from "../models/category.model.js";
import { FAQ } from "../models/FAQ.model.js";
import { MasterDB } from "../models/MasterDB.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { translateText } from "../utils/translate.js";
// import { authenticate } from "../../../shopify.server.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { storeId, categoryName, description } = req.body;

  const store = await MasterDB.findOne({ storeId });

  if (!store) {
    throw new ApiError(400, "Store not found");
  }

  if (!categoryName) {
    throw new ApiError(400, "Category Name and Description are required");
  }

  const newCategory = await Category.create({
    storeId,
    categoryName,
    description,
  });

  res
    .status(201)
    .json(new ApiResponse(200, newCategory, "Category created Successfully."));
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(400, "Category not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched Successfully."));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(400, "Category not found");
  }

  let { categoryName, description, isActive } = req.body;

  if (!categoryName) {
    categoryName = category.categoryName;
  }

  if (!description) {
    description = category.description;
  }

  if (!isActive) {
    isActive = category.isActive;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { categoryName, description, isActive },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(400, "update unsucessfully");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updaed Successfully")
    );
});

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, deletedCategory, "Category Deleted Successfully")
      );
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new ApiError(500, "Something went wrong while deleteing category.");
  }
};

export const getAllCategories = asyncHandler(async (req, res) => {
  // const fetchRequest = new Request(`http://${req.headers.host}${req.url}`, {
  //   method: req.method,
  //   headers: req.headers,  // Pass headers correctly
  // });
  // console.log("request : ", req)
  // console.log(fetchRequest);
  
  // console.log("Host : ",req.headers.host);
  // console.log("URL : ", req.url)
  
  // const session = await authenticate.admin(fetchRequest)
  // console.log(session);

  
  const { storeId } = req.params;
  const {language} = req.query;

  

  const categories = await Category.find({ storeId });

  if (!categories) {
    throw new ApiError(404, "No Categories found for this store.");
  }

  const translatedCategories = await Promise.all(
    categories.map(async (category) => {
      const translatedName = await translateText(category.categoryName, language);
      const translatedDescription = await translateText(category.description, language);  

      return {
        ...category.toObject(),
        categoryName: translatedName,
        description: translatedDescription
      };
    })
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        translatedCategories,
        "Categories are fetched Successfully based on Store"
      )
    );
});

// export const getCategoriesWithFAQs = async (req, res) => {

//   try {
//     const { storeId } = req.params;
//     const { language } = req.query;
    
//     if (!storeId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Store ID is required." });
//     }

//     // Fetch categories with their FAQs
//     const categories = await Category.aggregate([
//       { $match: { storeId } }, 
//       {
//         $lookup: {
//           from: "faqs", // Mongoose converts "FAQ" model to "faqs" collection
//           localField: "_id",
//           foreignField: "categoryId",
//           as: "faqs",
//         },
//       },
//     ]);

//     const translatedCategories = await Promise.all(
//       categories.data.map(async (category) => {
//         const translatedName = await translateText(category.categoryName, language);
    
//         // Translate FAQs within the category
//         const translatedFAQs = await Promise.all(
//           category.faqs.map(async (faq) => {
//             const translatedQuestion = await translateText(faq.question, language);
//             const translatedAnswer = faq.answerType === 'text' ? await translateText(faq.answer, language) : faq.answer;
    
//             return {
//               ...faq,
//               question: translatedQuestion,
//               answer: translatedAnswer
//             };
//           })
//         );
    
//         return {
//           ...category,
//           categoryName: translatedName,
//           faqs: translatedFAQs
//         };
//       })
//     );
    
//     res.status(200).json({
//       success: true,
//       data: translatedCategories,
//       message: "Categories with FAQs fetched successfully.",
//     });
//   } catch (error) {
//     console.error("Error fetching categories with FAQs:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

export const getCategoriesWithFAQs = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { language } = req.query;
    
    if (!storeId) {
      return res
        .status(400)
        .json({ success: false, message: "Store ID is required." });
    }

    // Fetch categories with their FAQs
    const categories = await Category.aggregate([
      { $match: { storeId } }, 
      {
        $lookup: {
          from: "faqs", // Mongoose converts "FAQ" model to "faqs" collection
          localField: "_id",
          foreignField: "categoryId",
          as: "faqs",
        },
      },
    ]);

    const translatedCategories = await Promise.all(
      categories.map(async (category) => {
        const translatedName = await translateText(category.categoryName, language);
    
        // Translate FAQs within the category
        const translatedFAQs = await Promise.all(
          category.faqs.map(async (faq) => {
            const translatedQuestion = await translateText(faq.question, language);
            const translatedAnswer = faq.answerType === 'text' ? await translateText(faq.answer, language) : faq.answer;
    
            return {
              ...faq,
              question: translatedQuestion,
              answer: translatedAnswer
            };
          })
        );
    
        return {
          ...category,
          categoryName: translatedName,
          faqs: translatedFAQs
        };
      })
    );
    
    res.status(200).json({
      success: true,
      data: translatedCategories,
      message: "Categories with FAQs fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching categories with FAQs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
