import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    storeId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    answerType: {
      type: String,
      enum: ["text", "image", "video"],
      required: true,
      default: "text",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const FAQ = mongoose.model("FAQ", FAQSchema);
