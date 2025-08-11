import { Food } from "../model/food.js";

export const searchFoodController = async (req, res) => {
  try {
    const { foodname } = req.query;
    if (!foodname || foodname.trim().length < 3) {
      return res.status(400).send({
        success: false,
        message: "Please Enter atleast 3 characters to search",
      });
    }
    const regex = new RegExp(foodname, "i");
    const foods = await Food.find({ name: { $regex: regex } }).populate(
      "restaurant"
    );

    return res.status(200).send({
      success: true,
      message: "food searched successfully",
      food: foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
