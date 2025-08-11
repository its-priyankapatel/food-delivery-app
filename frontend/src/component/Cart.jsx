import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoStar } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { RiEBike2Line } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = () => {
  const { backendUrl, handleAddCart } = useContext(AppContext);
  const [cartItem, setCartItem] = useState([]);
  const [cart, setCart] = useState({});
  const token = localStorage.getItem("token") || "";

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
  });

  const DecrementCardItem = async (foodId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/cart/reduce-cart/${foodId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        // setCartItem(data.cartItem.items);
        // setCart(data.cartItem);
        // console.log(data.cartItem);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleIncrement = async (item) => {
    const result = await handleAddCart(item.food._id);
    if (result === 1) {
      await fetchCartItem();
    }
  };
  const handleDecrement = async (item) => {
    const result = await DecrementCardItem(item.food._id);
    if (result === 1) {
      await fetchCartItem();
    }
  };

  const handleDeleteCart = async (item) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/api/cart/remove-cart/${item.food._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-primary">
        {cartItem.length <= 0 ? (
          <p>Cart is Empty</p>
        ) : (
          <div className="h-[90%] w-[85%] shadow-2xl shadow-black-50 rounded-xl flex justify-center items-center bg-primary">
            <div className="w-[70%] h-full flex flex-col gap-4 p-4">
              {cartItem.map((item, index) => (
                <div
                  key={index}
                  className="h-50 w-full flex shadow-lg shadow-black-50 rounded-sm"
                >
                  <div className="w-[70%] h-full flex items-center py-4 pl-4 gap-8">
                    <div
                      className="h-40 w-40 bg-center bg-no-repeat bg-cover rounded-xl"
                      style={{ backgroundImage: `url(${item.food.image})` }}
                    ></div>
                    <div className="justify-self-start h-40 flex flex-col gap-2">
                      <h2 className="text-2xl font-semibold text-primary">
                        {item.food.name}
                      </h2>
                      <p className="text-md font-semibold text-tertiary">
                        ₹ {item.foodPrice}
                      </p>
                      <p className="flex gap-1 w-12 h-7 items-center rounded-sm px-1 bg-secondary text-white">
                        {item.food.rating} <IoStar />
                      </p>
                    </div>
                  </div>

                  <div className="w-[30%] h-full flex items-center justify-around">
                    <div className="flex border-2 border-secondary rounded-md w-[50%] h-10 justify-around  items-center text-lg   text-secondary font-semibold">
                      <FaMinus
                        onClick={() => handleDecrement(item)}
                        className="cursor-pointer"
                      />
                      {item.quantity}
                      <FaPlus
                        onClick={() => handleIncrement(item)}
                        className="cursor-pointer "
                      />
                    </div>
                    <RiDeleteBinLine
                      onClick={() => handleDeleteCart(item)}
                      className="h-6 w-6 text-tertiary cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[30%] h-full border-l-4 border-primary bg-orange-600/5 p-4 text-tertiary">
              <h1 className="font-bold text-2xl">Bill Details</h1>
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex justify-between">
                  <p className="flex gap-2 items-center text-lg">
                    <LuNotebookText /> <span>Item Total</span>
                  </p>
                  <p className="text-lg">₹ {cart.total}</p>
                </div>
                <div className="flex justify-between">
                  <p className="flex gap-2 text-lg items-center">
                    <RiEBike2Line /> <span>Delivery Charges</span>
                  </p>
                  <p className="text-lg">₹ 40</p>
                </div>
                <div className="flex justify-between">
                  <p className="flex gap-2 text-lg items-center">
                    <HiOutlineShoppingBag />
                    <span> Handling Charges</span>
                  </p>
                  <p className="text-lg">₹ 4</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-xl font-semibold ">Grand Total</p>
                  <p className="text-xl font-semibold">
                    ₹ {cart.total + 40 + 4}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
