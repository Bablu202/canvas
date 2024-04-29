"use client";
import React, { useState, useRef, useEffect } from "react";

enum DrawingTool {
  Pencil = "pencil",
  Rectangle = "rectangle",
}

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawingTool, setDrawingTool] = useState<DrawingTool>(
    DrawingTool.Pencil
  );
  const [brushColor, setBrushColor] = useState<string>("#000000"); // default brush color
  const [brushSize, setBrushSize] = useState<number>(2); // default brush size
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [fillColor, setFillColor] = useState<string>("#ffffff"); // default fill color for rectangles

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = brushSize;
      }
    }
  }, [brushSize]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      setIsDrawing(true);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath(); // Reset the drawing path
        const { offsetX, offsetY } = event.nativeEvent;
        setStartPoint({ x: offsetX, y: offsetY });
      }
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { offsetX, offsetY } = event.nativeEvent;
        if (drawingTool === DrawingTool.Pencil) {
          ctx.strokeStyle = brushColor;
          ctx.lineTo(offsetX, offsetY);
          ctx.stroke();
        } else if (drawingTool === DrawingTool.Rectangle) {
          const { x, y } = startPoint as { x: number; y: number };
          const width = offsetX - x;
          const height = offsetY - y;
          ctx.fillStyle = fillColor;
          ctx.fillRect(x, y, width, height);
          ctx.strokeStyle = brushColor;
          ctx.strokeRect(x, y, width, height);
        }
      }
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const changeDrawingTool = (tool: DrawingTool) => {
    setDrawingTool(tool);
  };

  return (
    <div>
      <div className="toolbar">
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
        />
        <input
          type="color"
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={() => changeDrawingTool(DrawingTool.Pencil)}>
          Pencil
        </button>
        <button onClick={() => changeDrawingTool(DrawingTool.Rectangle)}>
          Rectangle
        </button>
        <button onClick={clearCanvas}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        width={800} // set your canvas width
        height={600} // set your canvas height
        style={{ border: "1px solid #000" }}
      />
      <style jsx>{`
        .toolbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #ffffff;
          padding: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          z-index: 999;
        }
      `}</style>
    </div>
  );
};

export default CanvasComponent;
