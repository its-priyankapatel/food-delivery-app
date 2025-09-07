import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoStar } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { RiEBike2Line } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdTrash } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import "./Cart.css";
import BackButton from "./BackButton.jsx";

const Cart = () => {
  const { backendUrl, handleAddCart } = useContext(AppContext);
  const [cartItem, setCartItem] = useState([]);
  const [cart, setCart] = useState({});
  const token = localStorage.getItem("userToken") || "";

  // ✅ fetch cart items
  const fetchCartItem = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/cart/retrieve/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCartItem(data.cartItem.items);
        setCart(data.cartItem);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []); // ✅ prevent infinite loop by adding dependency array

  // ✅ Stripe checkout
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

      const response = await axios.post(
        backendUrl + "/api/payment/create-checkout-session",
        {
          products: cartItem.map((item) => ({
            name: item.food.name,
            price: item.foodPrice, // price per unit
            quantity: item.quantity,
            image: item.food.image,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );

      const session = response.data;

      if (!session.id) {
        throw new Error("Stripe session not created");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // ✅ decrement cart
  const DecrementCardItem = async (foodId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/cart/reduce-cart/${foodId}`,
        {},
        { headers: { Authorization: `Bearer ${token} ` } }
      );
      if (data.success) {
        await fetchCartItem();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // ✅ increment cart
  const handleIncrement = async (item) => {
    const result = await handleAddCart(item.food._id);
    if (result) {
      await fetchCartItem();
    }
  };

  const handleDecrement = async (item) => {
    await DecrementCardItem(item.food._id);
  };

  // ✅ delete cart item
  const handleDeleteCart = async (item) => {
    try {
      await axios.delete(
        backendUrl + `/api/cart/remove-cart/${item.food._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCartItem();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {cartItem.length <= 0 ? (
        <div className="h-50 w-60 flex flex-col items-center justify-center gap-4 shadow-md">
          <img
            className="h-20 md:h-30 w-20 md:w-30"
            src="https://res.cloudinary.com/dbbmvt91t/image/upload/v1755844226/no-buying_1_v54u47.png"
            alt=""
          />
          <p className="text-pink-400 text-lg md:text-xl">
            Oops! Cart is Empty
          </p>
        </div>
      ) : (
        <div className="h-screen w-full md:w-[85%] shadow-2xl rounded-xl flex flex-col md:flex-row justify-center items-center">
          {/* Cart Items */}
          <div
            id="scrollbar"
            className="w-full md:w-[70%] h-full overflow-y-scroll flex flex-col gap-2 md:gap-4 p-4"
          >
            <BackButton />
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="h-38 md:h-50 w-full flex shadow-lg rounded-sm"
              >
                <div className="w-[70%] h-full flex items-center py-4 pl-1 md:pl-4 gap-4 md:gap-8">
                  <div
                    className="h-[98%] md:h-[90%] w-[50%] md:w-40 bg-center bg-no-repeat bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${item.food.image})` }}
                  ></div>
                  <div className="h-32 md:h-40 flex flex-col gap-2">
                    <h2 className="text-lg md:text-2xl font-semibold text-tertiary">
                      {item.food.name}
                    </h2>
                    <p className="text-sm md:text-base font-semibold text-tertiary">
                      ₹ {item.foodPrice}
                    </p>
                    <p className="flex gap-1 w-11 md:w-12 h-7 text-sm md:text-base items-center rounded-sm px-1 bg-secondary text-white">
                      {item.food.rating} <IoStar />
                    </p>
                  </div>
                </div>

                <div className="w-[30%] h-full flex flex-col md:flex-row items-center justify-around ">
                  <div className="flex border-2 border-secondary rounded-md w-[70%] md:w-[50%] h-7 md:h-10 justify-around items-center text-base md:text-lg text-secondary font-semibold">
                    <FaMinus
                      onClick={() => handleDecrement(item)}
                      className="cursor-pointer"
                    />
                    {item.quantity}
                    <FaPlus
                      onClick={() => handleIncrement(item)}
                      className="cursor-pointer"
                    />
                  </div>
                  <IoMdTrash
                    onClick={() => handleDeleteCart(item)}
                    className="size-5 md:size-7 p-0 md:p-1 cursor-pointer hover:rounded-full hover:bg-gray-300 text-secondary"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bill Details */}
          <div className="w-full md:w-[30%] h-[40%] md:h-full border-l-0 md:border-l-4 border-primary p-4 text-tertiary bg-orange-600/5">
            <h1 className="font-bold text-xl md:text-2xl">Bill Details</h1>
            <div className="flex flex-col gap-3 mt-2 md:mt-4">
              <div className="flex justify-between">
                <p className="flex gap-2 items-center text-base md:text-lg">
                  <LuNotebookText /> <span>Item Total</span>
                </p>
                <p className="text-base md:text-lg">₹ {cart.total}</p>
              </div>
              <div className="flex justify-between">
                <p className="flex gap-2 text-base md:text-lg items-center">
                  <RiEBike2Line /> <span>Delivery Charges</span>
                </p>
                <p className="text-base md:text-lg">₹ 40</p>
              </div>
              <div className="flex justify-between">
                <p className="flex gap-2 text-base md:text-lg items-center">
                  <HiOutlineShoppingBag />
                  <span> Handling Charges</span>
                </p>
                <p className="text-base md:text-lg">₹ 4</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-lg md:text-xl font-semibold ">Grand Total</p>
                <p className="text-lg md:text-xl font-semibold">
                  ₹ {cart.total + 40 + 4}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                onClick={makePayment}
                className="h-8 md:h-10 w-22 md:w-30 bg-tertiary text-primary font-semibold rounded-sm cursor-pointer hover:bg-red-800 text-sm md:text-base mt-3 md:mt-10"
              >
                Pay ₹{cart.total + 40 + 4}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
