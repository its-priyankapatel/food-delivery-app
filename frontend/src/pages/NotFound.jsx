import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-7xl font-poppins font-bold">
      404 Not Found
      <p className="text-gray-500 text-xl font-semibold mt-4">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
