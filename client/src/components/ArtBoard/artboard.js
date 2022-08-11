import React from "react";

import { useOnDraw } from "./Hooks";

const ArtBoard = () => {
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#FFFF00", 5);
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <canvas
      className="w-100 h-100 bg-white justify-content-center border-solid border-black"
      onMouseDown={onCanvasMouseDown}
      ref={setCanvasRef}
    />
  );
};

export default ArtBoard;
