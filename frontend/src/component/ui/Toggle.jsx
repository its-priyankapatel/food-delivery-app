import React from "react";

const Toggle = ({
    isActive,
    onToggle,
    activeColor = "#1A2227",     // default green
    inactiveColor = "#d1d5db",   // default gray
    knobColor = "#ffffff",
    width = 50,
    height = 26
}) => {

    return (
        <button
            onClick={() => onToggle(!isActive)}
            style={{
                width,
                height,
                backgroundColor: isActive ? activeColor : inactiveColor,
                borderRadius: height,
                position: "relative",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
            }}
        >
            <div
                style={{
                    width: height - 4,
                    height: height - 4,
                    backgroundColor: knobColor,
                    borderRadius: "50%",
                    position: "absolute",
                    top: 2,
                    left: isActive ? width - height + 2 : 2,
                    transition: "left 0.3s ease"
                }}
            />
        </button>
    );
};

export default Toggle;