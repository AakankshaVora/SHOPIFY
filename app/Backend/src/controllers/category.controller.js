import { Category } from "../models/category.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { storeId, categoryName, description } = req.body;

    const store = await MasterDB.findById(storeId);

    if (!store) {
      throw new ApiError(400, "Store is not Found");
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
      .json(
        new ApiResponse(200, newCategory, "Category created Successfully.")
      );
  } catch (error) {
    console.error("Error creating category:", error);
    throw new ApiError(500, "Something went wrong while creating category.");
  }
});

export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      throw new ApiError(400, "Category not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, category, "Category fetched Successfully."));
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new ApiError(500, "Something went wrong while fetching category.");
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const { categoryName, description = "", isActive = true } = req.body;

    if (!categoryName) {
      throw new ApiError(400, "Category Name is required");
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
        new ApiResponse(200, updateCategory, "ACtegory updaed Successfully")
      );
  } catch (error) {
    console.error("Error updating category:", error);
    throw new ApiError(500, "Something went wrong while updating category.");
  }
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
