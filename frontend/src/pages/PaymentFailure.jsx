import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-primary">
        <div className="h-60 w-90 flex flex-col items-center gap-3 py-4  shadow-lg shadow-gray-500">
          <img
            className="h-20 w-27"
            src="https://res.cloudinary.com/dbbmvt91t/image/upload/v1755800460/payment_ttr4ok.png"
            alt=""
          />
          <p className="text-2xl font-semibold">Payment Failed!</p>
          <p className="text-sm">Please try Again</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 p-2 text-sm rounded-sm text-white cursor-pointer"
          >
            Back to home page
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentFailure;
