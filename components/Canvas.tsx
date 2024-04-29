"use client";
import { useState, useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
}

interface Shape {
  type: "line" | "rectangle" | "circle";
  start: Point;
  end: Point;
  color: string;
  fill?: string;
}

const CanvasComponentTwo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [tool, setTool] = useState<"pencil" | "line" | "rectangle" | "circle">(
    "pencil"
  );
  const [strokeColor, setStrokeColor] = useState<string>("#000000");
  const [fillColor, setFillColor] = useState<string>("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    setCtx(context);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const startPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    if (tool === "pencil") {
      setIsDrawing(true);
      setStartPoint(startPoint);
    } else if (tool === "line" || tool === "rectangle" || tool === "circle") {
      setStartPoint(startPoint);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    const currentPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    if (tool === "pencil" && isDrawing) {
      drawLine(ctx, startPoint, currentPoint, strokeColor, strokeWidth);
      setStartPoint(currentPoint);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    const endPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    if (tool === "line" || tool === "rectangle" || tool === "circle") {
      const newShape: Shape = {
        type: tool,
        start: startPoint,
        end: endPoint,
        color: strokeColor,
        fill: tool === "rectangle" || tool === "circle" ? fillColor : undefined,
      };
      drawShape(newShape);
    }
    setIsDrawing(false);
  };

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    color: string,
    width: number
  ) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  };

  const drawShape = (shape: Shape) => {
    if (!ctx) return;

    ctx.beginPath();
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = strokeWidth;
    if (shape.type === "line") {
      ctx.moveTo(shape.start.x, shape.start.y);
      ctx.lineTo(shape.end.x, shape.end.y);
    } else if (shape.type === "rectangle") {
      ctx.rect(
        shape.start.x,
        shape.start.y,
        shape.end.x - shape.start.x,
        shape.end.y - shape.start.y
      );
      if (shape.fill) {
        ctx.fillStyle = shape.fill;
        ctx.fill();
      }
    } else if (shape.type === "circle") {
      const radius = Math.sqrt(
        Math.pow(shape.end.x - shape.start.x, 2) +
          Math.pow(shape.end.y - shape.start.y, 2)
      );
      ctx.arc(shape.start.x, shape.start.y, radius, 0, 2 * Math.PI);
      if (shape.fill) {
        ctx.fillStyle = shape.fill;
        ctx.fill();
      }
    }
    ctx.stroke();
    ctx.closePath();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
    };
    reader.readAsDataURL(file);
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
  return (
    <div>
      <div className="toolbar">
        <button onClick={() => setTool("pencil")}>Pencil</button>
        <button onClick={() => setTool("line")}>Line</button>
        <button onClick={() => setTool("rectangle")}>Rectangle</button>
        <button onClick={() => setTool("circle")}>Circle</button>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="10"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
        />
        <input
          type="color"
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
        />
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text"
        />
        <button onClick={clearCanvas}>Clear</button>

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <style jsx>{`
        .toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 10px;
          background-color: #f0f0f0;
        }
        button {
          padding: 5px 10px;
          cursor: pointer;
          border: none;
          background-color: #ddd;
        }
        button:hover {
          background-color: #ccc;
        }
        input[type="color"],
        input[type="number"],
        input[type="text"] {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        input[type="file"] {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CanvasComponentTwo;
