import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IoArrowBack, IoRadioButtonOn } from "react-icons/io5";
import { TbPhoto } from "react-icons/tb";
import { AppContext } from "./../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUpdatedFields,
  validateRequiredFields,
} from "../helpers/FoodFormHelper";
import Spinner from "../component/Spinner";
import { useNotification } from "../component/shared/notificationProvider";
const EditFoodItem = () => {
  const { foodId } = useParams();
  const { showNotification } = useNotification();
  const [originalData, setOriginalData] = useState({});
  const [foodLoading, setFoodLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    inStock: true,
    isVeg: true,
    image: null,
  });
  const fetchFood = async (foodId) => {
    try {
      const response = await axios.get(
        backendUrl + `/api/food/get-food/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("restaurantToken")}`,
          },
        }
      );
      if (response.data.success) {
        const food = response.data.food;
        setFormData({
          name: food.name,
          price: food.price,
          category: food.category,
          description: food.description,
          inStock: food.inStock,
          isVeg: food.isVeg,
          image: null,
        });
        setOriginalData({
          name: food.name,
          price: food.price,
          category: food.category,
          description: food.description,
          inStock: food.inStock,
          isVeg: food.isVeg,
          image: food.image, // image URL
        });
        setImagePreview(food.image);
      }
    } catch (error) {
      console.error("❌ Error fetching food item:", error);
      navigate(-1);
    }
  };
  useEffect(() => {
    if (foodId) fetchFood(foodId);
  }, [foodId]);


  const { backendUrl, fetchRestaurant } = useContext(AppContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle toggle/checkbox
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // ✅ Handle food type (veg / non-veg)
  const handleFoodType = (isVeg) => {
    setFormData((prev) => ({ ...prev, isVeg }));
  };

  // ✅ Handle image upload
  const handleImageUpload = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };
  const navigate = useNavigate();
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      handleImageUpload(e.dataTransfer.files[0]);
  };

  // Inside handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = getUpdatedFields(formData, originalData);

    const requiredFields = ["name", "price", "category"];
    const errorMsg = validateRequiredFields(updatedData, requiredFields);
    if (errorMsg) return showNotification(errorMsg, "error");

    if (Object.keys(updatedData).length === 0) {
      return showNotification("No changes detected.", "info");
    }

    // Convert booleans to strings for FormData
    updatedData.inStock = formData.inStock ? "true" : "false";
    updatedData.isVeg = formData.isVeg ? "true" : "false";

    const payloadData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      payloadData.append(key, value);
    });

    try {
      setFoodLoading(true);
      const { data } = await axios.patch(
        `${backendUrl}/api/food/edit/${foodId}`,
        payloadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("restaurantToken")}`,
          },
        }
      );

      if (data.success) {
        showNotification("Food item updated successfully!", "success");
        fetchRestaurant();
        navigate(-1);
      } else {
        showNotification(data.message, "error");
      }
    } catch (error) {
      console.error("❌ Error updating food item:", error);
      showNotification("Failed to update food item.", "error");
    } finally {
      setFoodLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full px-24 bg-gray-50 p-6 font-poppins">
      {foodLoading && (
        <div className="fixed h-screen w-full bg-black/70 top-0 left-0 z-10 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {/* header*/}
      <div className="w-[60%] flex items-center gap-4 mb-8 mx-auto">
        <div
          onClick={() => navigate(-1)}
          className="h-12 w-12 border border-[rgba(0,0,0,0.1)] rounded-full flex items-center justify-center cursor-pointer"
        >
          <IoArrowBack className="text-2xl text-gray-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Food Item</h1>
          <p className="text-gray-600">
            Edit food menu item for your restaurant
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-[60%] mx-auto space-y-6">
        {/* ... image upload block (unchanged, just hook image) ... */}
        <div className="h-80 flex flex-col items-center justify-center mx-auto bg-[#f5f5f5] rounded-xl border border-[rgba(0,0,0,0.1)] px-8 pb-8">
          <p className="text-gray-700 w-full text-lg font-bold py-6">
            Food Image
          </p>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors h-full w-full hover:border-green-500 ${dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-600 text-white font-semibold px-2 py-1 rounded cursor-pointer"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData((prev) => ({ ...prev, image: null }));
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div>
                  <div className="h-full w-full flex flex-col justify-center items-center">
                    <div className="h-16 w-16 rounded-full text-center mx-auto bg-green-400/50 p-1 flex items-center justify-center">
                      <TbPhoto className="text-4xl text-green-600 mx-auto" />
                    </div>
                    <p className="text-black text-base font-semibold mt-8">
                      Drop your image here
                    </p>
                    <p className="text-sm text-gray-700">or click to browse</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0])
                  }
                />
              </div>
            )}
          </div>
        </div>
        {/* Basic Details */}
        <div className="w-full bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] rounded-xl p-6">
          <p className="text-gray-700 w-full text-lg font-bold">
            Basic Information
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">
                Food Name <span className="text-green-600">*</span>
              </p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Margherita Pizza"
                className="border-2 border-white outline-none rounded-md h-8 text-sm pl-2 focus:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">
                Price (₹)<span className="text-green-600">*</span>
              </p>
              <input
                type="number"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="border-2 border-white outline-none rounded-md h-8 text-sm pl-2 focus:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <p className="text-sm text-black">
              Category <span className="text-green-600">*</span>
            </p>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Dessert, Main Course"
              className="border-2 border-white outline-none rounded-md w-[48%] h-8 text-sm pl-2 focus:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <p className="text-sm text-black">Description</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your food item..."
              className="border-2 border-white outline-none rounded-md min-h-16 text-sm pl-2 focus:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>

        {/* Settings */}
        <div className="w-full bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] rounded-xl p-6">
          <p className="text-gray-700 w-full text-lg font-bold">Settings</p>
          <div className="w-full mt-5 flex justify-between">
            <div>
              <p className="text-black text-sm">In Stock</p>
              <p className="text-gray-700 text-xs">
                Is the item currently available?
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleCheckbox}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="w-full mt-5 flex flex-col justify-between gap-4">
            <p className="text-black text-sm">Food Type</p>
            <div className="flex w-full gap-4">
              <div
                onClick={() => handleFoodType(true)}
                className={`flex p-2 justify-center items-center w-1/3 h-10 gap-3 border rounded-lg cursor-pointer ${formData.isVeg
                  ? "border-green-500 bg-green-500/15"
                  : "border-[rgba(0,0,0,0.1)] hover:border-green-500"
                  }`}
              >
                <IoRadioButtonOn className="text-green-600" />
                <p className="text-sm text-gray-700">Vegetarian</p>
              </div>
              <div
                onClick={() => handleFoodType(false)}
                className={`flex p-2 justify-center items-center w-1/3 h-10 gap-3 border rounded-lg cursor-pointer ${!formData.isVeg
                  ? "border-red-600 bg-red-600/15"
                  : "border-[rgba(0,0,0,0.1)] hover:border-red-600"
                  }`}
              >
                <IoRadioButtonOn className="text-red-600" />
                <p className="text-sm text-gray-700">Non-Vegetarian</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex justify-center items-center gap-6">
          <button
            type="reset"
            className="w-1/2 text-gray-700 text-base hover:font-semibold border border-[rgba(0,0,0,0.1)] h-10 rounded-lg hover:bg-red-600/15 hover:text-red-600 hover:border-red-600"
            onClick={() => setFormData(originalData)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 text-gray-700 text-base hover:font-semibold border border-[rgba(0,0,0,0.1)] h-10 rounded-lg hover:bg-green-600 hover:text-white"
          >
            Update Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFoodItem;
