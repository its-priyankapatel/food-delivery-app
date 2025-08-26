import React from "react";
import Row from "./Row";

const BG = () => {
  const rows = Array.from({ length: 30 });
  return (
    <div className="bg-yellow-400 h-screen w-[100%] overflow-clip relative">
      <div className="w-full h-full -rotate-35 absolute -top-100 -left-20 -translate-x-50 -tranlate-y-50">
        {rows.map((row, index) => (
          <div key={index} className="flex flex-col">
            <Row reverse={false} />
            <Row reverse={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BG;
