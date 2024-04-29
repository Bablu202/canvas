"use client";
import React, { useState, useRef, useEffect } from "react";

enum DrawingTool {
  Pencil = "pencil",
  Rectangle = "rectangle",
  Circle = "circle",
}

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawingTool, setDrawingTool] = useState<DrawingTool>(
    DrawingTool.Pencil
  );
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(2);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [fillColor, setFillColor] = useState<string>("#ffffff");

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
          setEndPoint({ x: offsetX, y: offsetY });
        }
      }
    }
  };

  const endDrawing = () => {
    if (drawingTool === DrawingTool.Rectangle && startPoint && endPoint) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const { x: startX, y: startY } = startPoint;
          const { x: endX, y: endY } = endPoint;
          const width = endX - startX;
          const height = endY - startY;
          ctx.fillStyle = fillColor;
          ctx.fillRect(startX, startY, width, height);
          ctx.strokeStyle = brushColor;
          ctx.strokeRect(startX, startY, width, height);
        }
      }
    }
    setIsDrawing(false);
    setStartPoint(null);
    setEndPoint(null);
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
        width={800}
        height={600}
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

//Addons
//ctx.globalAlpha = 0.5; useState ,input range 0.2 - 0.9
