import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = ({ titleText = "Categories", active = false, activeName = "" }) => {
    const { backendUrl } = useContext(AppContext);
    const token = localStorage.getItem("userToken")
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories()
    }, [])
    const fetchCategories = async () => {
        const response = await axios.get(backendUrl + '/api/food/get-categories', { headers: { Authorization: `Bearer ${token}` } });
        if (response.data) {
            console.log(response.data.categories)
            setCategories(response.data.categories)
        }
    }
    const navigate = useNavigate();
    const handleNavigate = (categoryId) => {
        navigate(`/all-food/${categoryId}`)
    }
    return (
        <div className='w-full mt-14 flex flex-col'>
            <h1 className='text-xl font-bold font-poppins flex items-center'>{titleText}
                <FaChevronRight className='text-base pl-2' />
            </h1>
            <div className='scroll-smooth h-40 py-2 w-full overflow-x-auto flex gap-2 items-center scrollbar-hide'>
                {categories
                    .filter(category =>
                        !(active && category.name === activeName)
                    )
                    .map((category, idx) => (
                        <div
                            onClick={() => handleNavigate(category.name)}
                            key={idx}
                            className='md:size-32 size-24 shrink-0 flex flex-col items-center justify-center rounded-xl self-center hover:scale-105 transition duration-300 cursor-pointer'
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className='size-16 md:size-24 rounded-full object-cover border border-primary/50 md:shadow-[0px_10px_10px_rgba(0,0,0,0.2)] shadow-[0px_5px_5px_rgba(0,0,0,0.2)]'
                            />
                            <h3 className='text-sm font-medium text-primary/80'>
                                {category.name}
                            </h3>
                        </div>
                    ))}

            </div>
        </div>
    )
}

export default Categories