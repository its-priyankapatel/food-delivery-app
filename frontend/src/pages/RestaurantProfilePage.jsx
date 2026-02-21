import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'
import Toggle from '../component/ui/Toggle'
import { AppContext } from '../context/AppContext'
import { uploadToCloudinary } from '../utils/config/CloudinaryUploads'
import Spinner from '../component/Spinner'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useNotification } from './../component/shared/notificationProvider';

const RestaurantProfilePage = () => {
    const coverInputRef = useRef(null)
    const { showNotification } = useNotification()
    const navigate = useNavigate()
    const { backendUrl, fetchRestaurant, restaurant } = useContext(AppContext)
    const { currencySymbol } = useContext(AppContext);
    const [initialRestaurant, setInitialRequest] = useState(restaurant)
    const [restaurantData, setRestaurantData] = useState(initialRestaurant);
    const [loading, setLoading] = useState(false)
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        if (restaurant) {
            setInitialRequest(restaurant);
            setRestaurantData(restaurant);
        }
    }, [restaurant]);
    const handleTag = (e) => {
        e.preventDefault()
        if (!newTag.trim()) return
        if (restaurantData.tags.length >= 10) return

        if (restaurantData.tags.includes(newTag.toLowerCase())) return

        setRestaurantData(prev => ({
            ...prev,
            tags: [...prev.tags, newTag.toLowerCase()]
        }))

        setNewTag("")
    }

    const handleCoverChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Optional: validate image size (5MB example)
        if (file.size > 5 * 1024 * 1024) {
            showNotification("Image must be less than 5MB", "info")
            return
        }

        const previewUrl = URL.createObjectURL(file)

        setRestaurantData(prev => ({
            ...prev,
            cover_image: previewUrl,
            cover_file: file   // keep original file for backend upload
        }))
    }
    const removeTag = (tagToRemove) => {
        setRestaurantData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSave = async () => {
        try {
            setLoading(true)

            let coverImageUrl = restaurantData.cover_image

            if (restaurantData.cover_file) {
                const uploadResult = await uploadToCloudinary({
                    file: restaurantData.cover_file,
                    onProgress: (pct) => {
                        console.log("Uploading:", pct + "%")
                    }
                })

                coverImageUrl = uploadResult.secure_url
            }

            const finalPayload = {
                ...restaurantData,
                cover_image: coverImageUrl,
                starting_price: Number(restaurantData.starting_price),
                max_delivery_radius: Number(restaurantData.max_delivery_radius)
            }

            delete finalPayload.cover_file

            const token = localStorage.getItem("restaurantToken")
            const { data } = await axios.patch(
                backendUrl + '/api/restaurant/edit',
                finalPayload,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                showNotification("Restaurant saved successfully", "success")
                fetchRestaurant()
            }

        } catch (error) {
            console.error("Save failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setRestaurantData(initialRestaurant)
        setNewTag("")
    }
    return (
        <div className='relative min-h-screen h-full w-full px-2 md:px-24 pb-32'>
            {

                loading && <div className='fixed left-0 top-0 h-screen bg-primary/50 w-full z-9999 flex justify-center items-center'>
                    <Spinner />
                </div>
            }
            <div
                onClick={() => navigate(-1)}
                className="absolute top-2 left-2 h-12 w-12 border-2 border-primary/80 rounded-full flex items-center justify-center cursor-pointer"
            >
                <IoArrowBack className="text-2xl text-gray-700" />
            </div>
            <div className='h-72 relative'>
                <div className="h-48 w-full overflow-hidden relative">
                    <div
                        onClick={() => coverInputRef.current.click()}
                        className='bg-primary size-12 rounded-full absolute flex items-center justify-center hover:scale-105 cursor-pointer bottom-2 right-2'>
                        <FaCamera size={24} className='text-white' />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={coverInputRef}
                        onChange={handleCoverChange}
                        className="hidden"
                    />
                    <img
                        src={restaurantData?.cover_image}
                        alt={restaurantData?.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className='absolute size-40 rounded-full left-4 top-[40%] overflow-hidden border-green-500 border-2 flex items-center justify-center bg-white'>
                    <img src={restaurantData?.logo} alt={restaurantData?.name} />
                </div>
            </div>
            <div className='font-poppins'>
                {/* Basic Information */}
                <div className='flex flex-col gap-4'>
                    <div>
                        <h2 className='text-xl font-bold'>Basic Information</h2>
                        <p className='text-zinc-400 text-xs'>General details about your restaurant</p>
                    </div>
                    <div className='border-b border-zinc-400' />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="restaurant name" className='text-sm text-zinc-800 font-semibold'>Restaurant Name</label>
                        <input value={restaurantData?.name}
                            onChange={(e) =>
                                setRestaurantData(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            }
                            type="text" placeholder='enter restaurant name' className='border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="restaurant name" className='text-sm text-zinc-800 font-semibold'>Description</label>
                        <textarea
                            onChange={(e) =>
                                setRestaurantData(prev => ({
                                    ...prev,
                                    description: e.target.value
                                }))
                            }
                            value={restaurantData?.description} type="text" placeholder='enter restaurant name' className='border-zinc-400 border scrollbar-hidden outline-none min-h-20 py-2 px-4 h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                    </div>
                </div>

                {/* Location */}
                <div className='flex flex-col gap-4 mt-16'>
                    <div>
                        <h2 className='text-xl font-bold'>Location</h2>
                        <p className='text-zinc-400 text-xs'>Where your restaurant is located</p>
                    </div>
                    <div className='border-b border-zinc-400' />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="restaurant name" className='text-sm text-zinc-800 font-semibold'>Address</label>
                        <input value={restaurantData?.location?.address}
                            onChange={(e) =>
                                setRestaurantData(prev => ({
                                    ...prev,
                                    location: {
                                        ...prev.location,
                                        address: e.target.value
                                    }
                                }))
                            }
                            type="text" placeholder='enter restaurant address' className='border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="restaurant name" className='text-sm text-zinc-800 font-semibold'>City</label>
                        <input value={restaurantData?.location?.city}
                            onChange={(e) => setRestaurantData(prev => ({
                                ...prev,
                                location: {
                                    ...prev.location,
                                    city: e.target.value
                                }
                            }))}
                            type="text" placeholder='enter City' className='border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                    </div>
                </div>

                {/* Opening Hours */}
                <div className='flex flex-col gap-4 mt-16'>
                    <div>
                        <h2 className='text-xl font-bold'>Operating Hours</h2>
                        <p className='text-zinc-400 text-xs'>When your restaurant is open</p>
                    </div>
                    <div className='border-b border-zinc-400' />
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor="restaurant name" className='text-sm text-zinc-800 font-semibold'>Opening Time</label>
                            <input value={restaurantData?.hours?.open}
                                onChange={(e) => setRestaurantData(prev => ({
                                    ...prev,
                                    hours: {
                                        ...prev.hours,
                                        open: e.target.value
                                    }
                                }))}
                                type="time" placeholder='enter opening time' className='border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor="restaurant name" className='text-sm text-zinc-800 font-semibold'>Closing Time</label>
                            <input value={restaurantData?.hours?.close}
                                onChange={(e) => setRestaurantData(prev => ({
                                    ...prev,
                                    hours: {
                                        ...prev.hours,
                                        close: e.target.value
                                    }
                                }))}
                                type="time" placeholder='enter closing time' className='border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <form onSubmit={(e) => handleTag(e)} className='flex flex-col gap-4 mt-14'>
                    <div>
                        <h2 className='text-xl font-bold'>Cuisine Tags</h2>
                        <p className='text-zinc-400 text-xs'>Categorize your restaurant (max 10 tags)</p>
                    </div>
                    <div className='border-b border-zinc-400' />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="tags" className='text-sm text-zinc-800 font-semibold'>Tags</label>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="enter appropriate tag"
                            className="border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md duration-300 transition focus:shadow-md"
                        />
                    </div>
                    <div className='flex gap-2'>
                        {restaurantData?.tags?.map((tag, idx) => (
                            <div key={idx} className='p-2 pl-4 h-8 rounded-3xl items-center flex gap-2 border-primary border hover:bg-primary hover:text-white transition duration-300'>
                                <h5>{tag}</h5>
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                >
                                    <IoIosClose size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </form>

                {/* Operations (isOpen, accepting Order, minimum price) */}
                <div className='flex flex-col gap-4 mt-14'>
                    <div>
                        <h2 className='text-xl font-bold'>Operations</h2>
                        <p className='text-zinc-400 text-xs'>Manage your restaurant operations and status</p>
                    </div>
                    <div className='border-b border-zinc-400' />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="starting_price" className='text-sm text-zinc-800 font-semibold'>Starting Price ({currencySymbol})</label>
                        <input value={restaurantData?.starting_price}
                            onChange={(e) => {
                                const value = e.target.value
                                setRestaurantData(prev => ({
                                    ...prev,
                                    starting_price: value === "" ? "" : Number(value)
                                }))
                            }}
                            type="number" step={0.1} min={0} placeholder='enter starting price' className='border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                    </div>
                    <div className='py-4 px-8 border border-zinc-400/30 h-20 rounded-md flex justify-between items-center'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="Restaurant Status" className='text-sm text-zinc-800 font-semibold'>Restaurant Status</label>
                            <p className='text-xs text-zinc-500'>Is your restaurant currently open?</p>
                        </div>
                        <div>
                            <Toggle
                                isActive={restaurantData?.is_open}
                                onToggle={() =>
                                    setRestaurantData(prev => ({
                                        ...prev,
                                        is_open: !prev.is_open
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className='py-4 px-8 border border-zinc-400/30 h-20 rounded-md flex justify-between items-center'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="Restaurant Status" className='text-sm text-zinc-800 font-semibold'>Accepting Orders</label>
                            <p className='text-xs text-zinc-500'>Are you currently accepting order?</p>
                        </div>
                        <div>
                            <Toggle
                                isActive={restaurantData?.accept_order}
                                onToggle={() =>
                                    setRestaurantData(prev => ({
                                        ...prev,
                                        accept_order: !prev.accept_order
                                    }))
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Delivery Radius */}
                <div className='flex flex-col mt-12 gap-5'>
                    <div>
                        <h2 className='text-xl font-bold'>Delivery</h2>
                        <p className='text-zinc-400 text-xs'>Delivery area and radius</p>
                    </div>
                    <div className='border-b border-zinc-400' />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="starting_price" className='text-sm text-zinc-800 font-semibold'>Max Delivery Radius (Km)</label>
                        <input value={restaurantData?.max_delivery_radius}
                            onChange={(e) => {
                                const value = e.target.value
                                setRestaurantData(prev => ({
                                    ...prev,
                                    max_delivery_radius: value === "" ? "" : Number(value)
                                }))
                            }}
                            type="number" step={1} min={1} placeholder='enter starting price' className='border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
                    </div>
                </div>

                {/* Save profile and reset profile button */}
                <div className="flex gap-4 mt-16">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 transition cursor-pointer font-semibold"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-zinc-300 font-semibold px-6 py-2 rounded-md hover:bg-zinc-400 transition"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantProfilePage