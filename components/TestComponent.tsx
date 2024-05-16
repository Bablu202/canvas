"use client";
import React, { useRef, useState } from "react";

interface Options {
  padding: number;
}

const TestComponent: React.FC = () => {
  const [options, setOptions] = useState<Options>({ padding: 4 }); // Initial padding value

  const handlePaddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPadding = parseInt(event.target.value);
    setOptions({ ...options, padding: newPadding });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <span
        style={{ padding: `${options.padding}px` }}
        className="border border-blue-500 p-2"
      >
        Word
      </span>
      <input
        type="range"
        min="0"
        max="20"
        value={options.padding}
        onChange={handlePaddingChange}
        className="ml-4"
      />
      <span className="ml-2">{options.padding}px</span>
    </div>
  );
};

export default TestComponent;
