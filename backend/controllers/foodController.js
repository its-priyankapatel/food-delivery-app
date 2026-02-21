import cloudinary from "../config/cloudinary.js";
import { Category } from "../model/category.js";
import { Food } from "../model/food.js";
import { Restaurant } from "../model/restaurant.js";
import colors from "colors";
import fs from "fs";

export const AddfoodController = async (req, res) => {
  try {
    const { name, price, description, category, rating, image } = req.body;
    const inStock = req.body.inStock === true;
    const isVeg = req.body.isVeg === true;
    const { id } = req.user;

    if (!name || !price || !description || !category || inStock === undefined) {
      return res.status(400).send({
        success: false,
        message: "All food fields are required",
      });
    }

    let isRestaurantExist = await Restaurant.findById(id);
    if (!isRestaurantExist) {
      return res.status(403).send({
        success: false,
        message: "You do not have permission to add food",
      });
    }

    let isCategory = await Category.findOne({ name: category });
    if (!isCategory) {
      await new Category({
        name: category,
        image: imageUrl.secure_url,
        count: 1,
      }).save();
    } else {
      isCategory.count += 1;
      await isCategory.save();
    }

    const newFood = new Food({
      name,
      price,
      description,
      category,
      inStock,
      isVeg,
      rating,
      image,
      restaurant: isRestaurantExist._id,
    });

    await newFood.save();

    isRestaurantExist.food.push(newFood._id);
    await isRestaurantExist.save();
    return res.status(201).send({
      success: true,
      message: "New Food Added",
      newFood,
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
          foodPrice: food.price,
        });
      }
    }

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
export const editFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, isVeg, inStock } = req.body;

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food Not Found",
      });
    }

    // Update only fields that are provided
    if (name !== undefined) food.name = name;
    if (price !== undefined) food.price = price;
    if (description !== undefined) food.description = description;
    if (category !== undefined) food.category = category;
    if (isVeg !== undefined) food.isVeg = isVeg;
    if (inStock !== undefined) food.inStock = inStock;

    // Handle image upload if a new image is provided
    if (req.file) {
      const imageUrl = await cloudinary.uploader.upload(req.file.path);
      food.image = imageUrl.secure_url;
      fs.unlinkSync(req.file.path); // remove local file after upload
    }

    await food.save();

    return res.status(200).json({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteFoodController = async (req, res) => {
  try {
    const { foodId } = req.params; // food id
    const { id } = req.user; // logged-in restaurant id

    // 1️⃣ Check if food exists
    const food = await Food.findById(foodId).populate("restaurant"); // fetch food + restaurant info
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    // 2️⃣ Verify that this restaurant owns the food
    if (food.restaurant._id.toString() !== id) {
      return res.status(403).send({
        success: false,
        message: "You do not have permission to delete this food",
      });
    }

    // 3️⃣ Remove food reference from restaurant's food array
    await Restaurant.findByIdAndUpdate(food.restaurant._id, {
      $pull: { food: food._id },
    });

    // 4️⃣ Delete the food
    await Food.findByIdAndDelete(foodId);

    return res.status(200).send({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.log("Delete Food Error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
