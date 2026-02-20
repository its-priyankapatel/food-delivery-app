import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema(
  {
    accept_order: {
      type: Boolean,
      default: false,
      required: false,
    },

    cover_image: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: true,
    },

    email: {
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

    hours: {
      close: {
        type: String,
        required: false,
      },
      open: {
        type: String,
        required: false,
      },
    },

    is_open: {
      type: Boolean,
      default: false,
      required: false,
    },

    location: {
      address: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
    },

    logo: {
      type: String,
      required: false,
    },

    max_delivery_radius: {
      type: Number,
      default: 1,
      required: false,
    },

    mobile: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    starting_price: {
      type: Number,
      default: 0,
      required: false,
    },

    tags: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

restaurantModel.path("food").default(function () {
  return [];
});

export const Restaurant = mongoose.model("Restaurant", restaurantModel);