import axios from 'axios'
import React, { useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'

const RestaurantProfilePage = () => {
    const initialRestaurant = {
        name: "Burger King",
        cover_image: "https://d1rgpf387mknul.cloudfront.net/products/Home/web/1x_web_20260105054903570954_1440x300jpg",
        logo: "https://tse4.mm.bing.net/th/id/OIP.cuT8f44iiICDTIAdw1Ns6gHaEK?cb=defcache2&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        starting_price: "49",
        tags: ["burger", "pizza", "fries"],
        description: "Burger King is known for its flame-grilled burgers, including the iconic Whopper, which features a flame-grilled beef patty topped with fresh lettuce, ripe tomatoes, onions, pickles, and a tangy signature sauce, all served on a sesame seed bun.",
        location: {
            address: "Hinjewadi, phase 3, Pune",
            city: "Pune"
        },
        hours: {
            open: "10:00",
            close: "22:00"
        },
        is_open: false,
        accept_order: false,
        max_delivery_radius: 23.1
    }
    const [restaurant, setRestaurant] = useState(initialRestaurant);
    const [loading, setLoading] = useState(false)
    const [newTag, setNewTag] = useState("");

    const handleTag = (e) => {
        e.preventDefault()
        console.log("Handle Tag called")
        if (!newTag.trim()) return
        if (restaurant.tags.length >= 10) return

        if (restaurant.tags.includes(newTag.toLowerCase())) return

        setRestaurant(prev => ({
            ...prev,
            tags: [...prev.tags, newTag.toLowerCase()]
        }))

        setNewTag("")
    }

    const removeTag = (tagToRemove) => {
        setRestaurant(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            console.log(restaurant)
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/posts",
                restaurant
            )

            console.log("Saved:", response.data)
            alert("Restaurant saved successfully 🚀")

        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setRestaurant(initialRestaurant)
        setNewTag("")
    }
    return (
        <div className='min-h-screen h-full w-full px-2 md:px-24 pb-32'>
            <div className='h-72 relative'>
                <div className="h-48 w-full overflow-hidden relative">
                    <div className='bg-primary size-12 rounded-full absolute flex items-center justify-center hover:scale-105 cursor-pointer bottom-2 right-2'>
                        <FaCamera size={24} className='text-white' />
                    </div>
                    <img
                        src={restaurant.cover_image}
                        alt={restaurant.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className='absolute size-40 rounded-full left-4 top-[40%] overflow-hidden border-green-500 border-2 flex items-center justify-center bg-white'>
                    <img src={restaurant.logo} alt={restaurant.name} />
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
                        <input value={restaurant.name}
                            onChange={(e) =>
                                setRestaurant(prev => ({
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
                                setRestaurant(prev => ({
                                    ...prev,
                                    description: e.target.value
                                }))
                            }
                            value={restaurant.description} type="text" placeholder='enter restaurant name' className='border-zinc-400 border scrollbar-hidden outline-none min-h-20 py-2 px-4 h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md' />
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
                        <input value={restaurant.location.address}
                            onChange={(e) =>
                                setRestaurant(prev => ({
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
                        <input value={restaurant.location.city}
                            onChange={(e) => setRestaurant(prev => ({
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
                            <input value={restaurant.hours.open}
                                onChange={(e) => setRestaurant(prev => ({
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
                            <input value={restaurant.hours.close}
                                onChange={(e) => setRestaurant(prev => ({
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
                            className="border-zinc-400 border pl-4 outline-none h-9 text-sm rounded-md bg-zinc-300 focus:bg-white duration-300 transition focus:shadow-md"
                        />
                    </div>
                    <div className='flex gap-2'>
                        {restaurant.tags.map((tag, idx) => (
                            <div key={idx} className='p-2 bg-zinc-400 h-8 rounded-3xl items-center flex gap-2 border-zinc-600 border'>
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
                <div className="flex gap-4 mt-16">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-zinc-300 px-6 py-2 rounded-md hover:bg-zinc-400 transition"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantProfilePage