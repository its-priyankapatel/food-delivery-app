import React from "react";

const CategoryCardSkeleton = () => {
    return (
        <div className="flex px-2 shrink-0 h-40 md:h-48 w-64 md:w-80 rounded-3xl bg-gray-100 animate-pulse">
            {/* Image Section */}
            <div className="h-[95%] w-[45%] flex flex-col py-2">
                <div className="size-24 md:size-32 rounded-xl bg-gray-300" />
                <div className="h-4 bg-gray-300 rounded mt-2 w-24" />
            </div>

            {/* Text Section */}
            <div className="w-[55%] px-2 flex flex-col gap-3 py-3">
                <div className="h-5 bg-gray-300 rounded w-28" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-16" />
            </div>
        </div>
    );
};

export default CategoryCardSkeleton;