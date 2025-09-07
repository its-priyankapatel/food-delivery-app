import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer flex items-center gap-1 text-tertiary font-semibold"
      >
        <MdOutlineKeyboardBackspace className="size-4 font-extrabold" />
        Back
      </button>
    </>
  );
};

export default BackButton;
