import React from 'react'
import { motion } from 'framer-motion';

const CategoryCard = ({ uniqueKey, product }) => {
    return (
        <div
            className='group flex px-1 md:px-2 shrink-0 h-40 md:h-48 w-64 md:w-80 rounded-3xl gap-2
    bg-linear-to-r from-gray-200 to-white 
    hover:to-gray-200 hover:border border-green-500/40 
    cursor-pointer transition duration-300'
            key={uniqueKey}
        >

            <div className='h-[95%] w-[45%] flex flex-col py-2'>

                {/* IMAGE WRAPPER */}
                <div className='overflow-hidden rounded-xl size-24 md:size-36'>
                    <img
                        loading='lazy'
                        src={product.foodImage}
                        alt={product.foodName}
                        className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-110'
                    />
                </div>

                <h2 className='text-base md:text-lg font-poppins'>
                    {product.foodName}
                </h2>
            </div>

            <div className='w-[55%] px-1 md:px-2 flex flex-col gap-2 font-poppins py-1 md:py-3'>
                <h1 className='text-lg md:text-xl font-semibold text-primary'>
                    {product.restaurantName}
                </h1>
                <p className='text-xs text-primary/50'>
                    {product.description}
                </p>
                <p className='text-green-600 text-sm font-semibold'>
                    ₹{product.foodPrice}
                </p>
            </div>

        </div>
    )
}

export default CategoryCard