"use client";
import React, { useState, ChangeEvent } from "react";
import SliderStyles from "./SliderStyles";

const Slider: React.FC = () => {
  const [value, setValue] = useState<number>(50);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  return (
    <div className="w-64 mx-auto mt-8 relative">
      <SliderStyles value={value} />
      <input type="range" value={value} onChange={handleChange} />

      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-500">0</span>
        <span className="text-sm text-gray-500">100</span>
      </div>
      <div className="mt-4">
        <span className="text-lg text-gray-700">{value}</span>
      </div>
    </div>
  );
};

export default Slider;
