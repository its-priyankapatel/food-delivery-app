import validator from "validator";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Restaurant } from "../model/restaurant.js";

export const SignUp = async (req, res) => {
  const { name, email, location, password } = req.body;
  try {
    if (!email || !name || !location || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Please Provide a valid Email address",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({
        success: false,
        message: "User Already Exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      location,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).send({
      success: true,
      message: "User Sign-up Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server Error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).send({
        success: false,
        message: "Password Doesn't Match",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    return res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server Error",
    });
  }
};
/*
@route   POST /api/auth/restaurant-login
@desc    Login for restaurant 
*/
export const restaurantLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant || restaurant.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    console.log(restaurant);
    const comparePassword = await bcrypt.compare(password, restaurant.password);
    if (!comparePassword) {
      return res.status(400).send({
        success: false,
        message: "Password Doesn't Match",
      });
    }
    const token = jwt.sign({ id: restaurant._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    return res.status(200).send({
      success: true,
      message: "Restaurant Login Successfully",
      restaurant,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server Error",
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Found Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Get User Successfully By Id",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
@route   GET /api/auth/get-restaurant
@desc    Get restaurant details 
*/

export const getRestaurantController = async (req, res) => {
  try {
    const { id } = req.user;

    const restaurant = await Restaurant.findOne({ _id: id }).populate("food");
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Restaurant Found Successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
