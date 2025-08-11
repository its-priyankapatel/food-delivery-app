import { Cart } from "../model/cartModel.js";
import { Food } from "../model/food.js";
import { User } from "../model/user.js";

export const addToCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    const foodItem = await Food.findOne({ _id: foodId });

    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: "Food item not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.food.toString() === foodId
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.foodPrice = foodItem.price * existingItem.quantity;
      } else {
        cart.items.push({
          food: foodItem._id,
          quantity: 1,
          foodPrice: foodItem.price,
        });
      }

      // ✅ Corrected total calculation
      cart.total = cart.items.reduce(
        (acc, item) => acc + Number(item.foodPrice),
        0
      );

      await cart.save();
    } else {
      cart = new Cart({
        user: userId,
        total: foodItem.price,
        items: [
          {
            food: foodItem._id,
            quantity: 1,
            foodPrice: foodItem.price,
          },
        ],
      });
      await cart.save();
    }

    res.status(200).send({
      success: true,
      message: "Cart Updated Successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const reduceCartController = async (req, res) => {
  try {
    const { foodId } = req.params;
    const userId = req.user.id;

    const foodItem = await Food.findOne({ _id: foodId });
    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: "Food Not Found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart not found",
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.food.toString() === foodId
    );

    if (existingItemIndex === -1) {
      return res.status(404).send({
        success: false,
        message: "Item not found in cart",
      });
    }

    const existingItem = cart.items[existingItemIndex];

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      existingItem.foodPrice = foodItem.price * existingItem.quantity;
    } else {
      // Remove the item completely
      cart.items.splice(existingItemIndex, 1);
    }

    // Recalculate cart total
    cart.total = cart.items.reduce(
      (acc, item) => acc + Number(item.foodPrice),
      0
    );

    await cart.save();

    return res.status(200).send({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const RetrieveCartItemsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItem = await Cart.findOne({ user: userId }).populate(
      "items.food"
    );
    if (!cartItem) {
      return res.status(404).send({
        success: false,
        message: "Cart Item Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Retrieve Cart Item Successfully",
      cartItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const RemoveCartItemController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the item index
    const itemIndex = cart.items.findIndex(
      (item) => item.food.toString() === foodId
    );

    if (itemIndex === -1) {
      return res.status(404).send({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);

    // Recalculate total
    cart.total = cart.items.reduce(
      (acc, item) => acc + Number(item.foodPrice),
      0
    );

    await cart.save();

    return res.status(200).send({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
