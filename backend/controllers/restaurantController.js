import { Restaurant } from "../model/restaurant.js";
import bcrypt from "bcrypt";

export const addRestaurantController = async (req, res) => {
  try {
    const { name, mobile, description, address, time, email, password } =
      req.body;
    if (
      !name ||
      !mobile ||
      !description ||
      !address ||
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
    const isRestaurant = await Restaurant.findOne({ email });
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


export const editRestaurantDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const { accept_order,
      cover_image,
      description,
      hours, is_open,
      location,
      logo,
      max_delivery_radius,
      name,
      starting_price,
      tags } = req.body;

    if (name == null || description == null) {
      return res.status(400).send({
        success: true,
        message: "provide necessary fields"
      })
    }
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant does not exist"
      })
    }

    restaurant.accept_order = accept_order;
    restaurant.cover_image = cover_image;
    restaurant.description = description;
    restaurant.hours = hours;
    restaurant.is_open = is_open;
    restaurant.location = location;
    restaurant.logo = logo;
    restaurant.max_delivery_radius = max_delivery_radius;
    restaurant.name = name;
    restaurant.starting_price = starting_price;
    restaurant.tags = tags;

    const updatedRestaurant = await restaurant.save();
    return res.status(200).send({
      success: true,
      message: "Details updated successfully",
      updatedRestaurant: updatedRestaurant
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
}