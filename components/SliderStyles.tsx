import React from "react";

interface SliderStylesProps {
  value: number;
}

const SliderStyles: React.FC<SliderStylesProps> = ({ value }) => {
  return (
    <style>
      {`
        input[type="range"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          outline: 0;
          height: 12px;
          border-radius: 40px;
          background: linear-gradient(to right, #ff9800 0%, #ff9800 ${value}%, #fff ${value}%, #fff 100%);
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
          border-radius: 50%;
          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          -moz-appearance: none;
          background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
          border-radius: 50%;
          box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
        }
      `}
    </style>
  );
};

export default SliderStyles;
/*  <SliderStyles value={value} />
      <input type="range" value={value} onChange={handleChange} />*/