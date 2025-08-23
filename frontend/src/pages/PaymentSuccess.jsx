import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-primary">
        <div className="h-70 w-90 flex flex-col items-center gap-3 py-4  shadow-lg shadow-gray-500">
          <img
            className="h-20 w-20"
            src="https://res.cloudinary.com/dbbmvt91t/image/upload/v1755798847/Rupees_nwwk8r.png"
          />
          <p className="text-2xl font-semibold">Payment Successful</p>
          <p className="text-sm text-yellow-600">Thank you for your payment</p>
          <button
            onClick={() => navigate("/")}
            className="h-10 w-40 bg-amber-600 text-sm cursor-pointer rounded-full text-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
