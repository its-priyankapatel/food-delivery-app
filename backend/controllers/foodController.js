import cloudinary from "../config/cloudinary.js";
import { Category } from "../model/category.js";
import { Food } from "../model/food.js";
import { Restaurant } from "../model/restaurant.js";
import colors from "colors";
import fs from "fs";

export const AddfoodController = async (req, res) => {
  try {
    const { name, price, description, category, inStock, rating, restaurant } =
      req.body;

    // ✅ Validate food fields
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !inStock ||
      !restaurant
    ) {
      return res.status(400).send({
        success: false,
        message: "All food fields are required",
      });
    }

    if ((rating && rating < 1) || rating > 5) {
      return res.status(400).send({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // ✅ Check if restaurant exists (by name & mobile)

    let isRestaurantExist = await Restaurant.findOne({ _id: restaurant });

    // ✅ If not, create restaurant
    if (!isRestaurantExist) {
      return res.status(403).send({
        success: false,
        message: "You do not have permission to add food",
      });
    }

    // ✅ Upload image
    const imageUrl = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // clean up local file

    // ✅ Check if category exists
    let isCategory = await Category.findOne({ name: category });

    if (!isCategory) {
      const newCategory = new Category({
        name: category,
        image: imageUrl.secure_url,
        count: 1,
      });
      await newCategory.save();
    } else {
      isCategory.count += 1;
      await isCategory.save();
    }

    // ✅ Create food item
    const newFood = new Food({
      name,
      price,
      image: imageUrl.secure_url,
      description,
      category,
      inStock,
      rating,
      restaurant: restaurant,
    });

    await newFood.save();

    // ✅ Push food to restaurant's food array
    isRestaurantExist.food.push(newFood._id);
    await isRestaurantExist.save();

    return res.status(201).send({
      success: true,
      message: "Food item and restaurant added successfully",
      food: newFood,
    });
  } catch (error) {
    console.log("Add Food Error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllFoodController = async (req, res) => {
  try {
    const food = await Food.find({})
      .populate("restaurant")
      .sort({ createdAt: -1 });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Food Get Successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const fetchFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Food Get Successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const fetchCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({ count: { $gt: 0 } });
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Categories Found Successfully",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFoodByCategoryController = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const foods = await Food.find({ category: categoryName }).populate(
      "restaurant"
    );
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "Food is not Found",
      });
    }
    console.log(foods);

    const uniqueRestaurants = [];
    const seen = new Set();

    for (const food of foods) {
      if (!seen.has(food.restaurant.id)) {
        seen.add(food.restaurant.id);
        uniqueRestaurants.push({
          restaurantId: food.restaurant.id,
          restaurantName: food.restaurant.name,
          foodId: food.id,
          foodName: food.name,
          foodImage: food.image,
          description: food.restaurant.description,
          rating: food.restaurant.rating,
        });
      }
    }
    console.log(
      "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
    );

    console.log(uniqueRestaurants);

    return res.status(200).send({
      success: true,
      message: "Food Fetched by Category successfully",
      food: uniqueRestaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
