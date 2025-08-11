import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

export const Category = mongoose.model("Category", categoryModel);
