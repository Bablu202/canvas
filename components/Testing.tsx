"use client";
import { useRef, useEffect, useState } from "react";

const CanvasComponentTwo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const handleMouseDown = (event: MouseEvent) => {
      setIsDrawing(true);
      draw(event);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDrawing) return;
      draw(event);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const draw = (event: MouseEvent) => {
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      ctx.lineWidth = 10; // Adjust as needed
      ctx.lineCap = "round";
      if (eraseMode) {
        ctx.strokeStyle = "white"; // Use white color to erase
      } else {
        ctx.strokeStyle = "black"; // Default drawing color
      }

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDrawing, eraseMode]);

  const toggleEraseMode = () => {
    setEraseMode(!eraseMode);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
      <button onClick={toggleEraseMode}>Toggle Erase Mode</button>
    </div>
  );
};

export default CanvasComponentTwo;
