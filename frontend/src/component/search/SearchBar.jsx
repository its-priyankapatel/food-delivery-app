import React, { useContext, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const searchPlaceholders = ["Food", "Dish", "Restaurant", "Breakfast"];
    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const { backendUrl } = useContext(AppContext);
    const token = localStorage.getItem("userToken");


    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.length > 2) {
                fetchTypeaheadResult();
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    const fetchTypeaheadResult = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/api/search/typeahead?q=${query}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setResults(response.data.products);
            console.log(response.data.products);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % searchPlaceholders.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[65%] w-[60%] md:w-[30%] border border-[rgba(0,0,0,0.1)] px-2 py-px flex bg-black/5 items-center rounded-md gap-2 relative font-poppins">

            <MdSearch className="text-3xl" />

            <input
                type="text"
                className="w-full h-full outline-none bg-transparent font-semibold"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />

            {query === "" && (
                <div className="absolute left-11 text-sm font-semibold text-primary/50 pointer-events-none flex items-center h-full">

                    <span className="mr-1">Search for</span>

                    {/* THIS IS IMPORTANT */}
                    <div className="relative overflow-hidden leading-none h-6 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={searchPlaceholders[index]}
                                className="block"
                                initial={{ y: 25 }}
                                animate={{ y: 0 }}
                                exit={{ y: -25 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                "{searchPlaceholders[index]}"
                            </motion.span>
                        </AnimatePresence>
                    </div>

                </div>
            )}
            <SearchResults results={results} />
        </div>
    );
};

export default SearchBar;