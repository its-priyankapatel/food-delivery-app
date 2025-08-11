import { Restaurant } from "../model/restaurant.js";
import bcrypt from "bcrypt";

export const addRestaurantController = async (req, res) => {
  try {
    const {
      name,
      mobile,
      description,
      address,
      rating,
      time,
      email,
      password,
    } = req.body;
    if (
      !name ||
      !mobile ||
      !description ||
      !address ||
      !rating ||
      !time ||
      !email ||
      !password
    ) {
      return res.status(400).send({
        success: false,
        message: "All Fields are Required",
      });
    }
    if (mobile.length < 10) {
      return res.status(400).send({
        success: false,
        message: "Mobile Number Must be 10 digits",
      });
    }
    const isRestaurant = await Restaurant.findOne({ name });
    if (isRestaurant) {
      return res.status(400).send({
        success: false,
        message: "Restaurant Already Exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newRestaurant = new Restaurant({
      name,
      mobile,
      description,
      address,
      rating,
      time,
      email,
      password: hashedPassword,
    });
    await newRestaurant.save();
    return res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const FetchAllRestaurantController = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({});
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Get Restaurant Successfully",
      restaurant: restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getRestaurantController = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id).populate("food");
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Get Restaurant Successfully",
      restaurant: restaurant,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
