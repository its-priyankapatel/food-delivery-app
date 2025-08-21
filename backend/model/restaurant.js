import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    time: {
      type: String,
      required: true,
    },
    food: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
restaurantModel.path("food").default(function () {
  return [];
});
export const Restaurant = mongoose.model("Restaurant", restaurantModel);
