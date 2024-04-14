import React, { useEffect, useRef } from "react";

function Graph({ width = 300, height = 300, WIN, callbacks }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { wheel, mousemove, mouseleave, mouseup, mousedown } = callbacks;

    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener("wheel", wheel);
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseleave", mouseleave);
    canvas.addEventListener("mouseup", mouseup);
    canvas.addEventListener("mousedown", mousedown);

    const PI2 = 2 * Math.PI;

    function xs(x) {
      return (x - WIN.LEFT) / WIN.WIDTH * canvas.width;
    }

    function ys(y) {
      return canvas.height - (y - WIN.BOTTOM) / WIN.HEIGHT * canvas.height;
    }

    const sx = x => x * WIN.WIDTH / canvas.width;

    const sy = y => -y * WIN.HEIGHT / canvas.height;

    const clear = () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const line = (x1, y1, x2, y2, color, width) => {
      ctx.beginPath();
      ctx.strokeStyle = color || "red";
      ctx.lineWidth = width || 2;
      ctx.moveTo(xs(x1), ys(y1));
      ctx.lineTo(xs(x2), ys(y2));
      ctx.stroke();
      ctx.closePath();
    }

    const point = (x, y, color, size) => {
      ctx.beginPath();
      ctx.strokeStyle = color || "f00";
      ctx.arc(xs(x), ys(y), size || 2, 0, PI2);
      ctx.stroke();
      ctx.closePath();
    }

    const text = (text, x, y) => {
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.fillText(text, xs(x), ys(y));
      ctx.stroke();
      ctx.closePath();
    }

    const polygon = (points, color = '#f805') => {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(xs(points[0].x), ys(points[0].y));
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(xs(points[i].x), ys(points[i].y));
      }
      ctx.lineTo(xs(points[0].x), ys(points[0].y));
      ctx.closePath();
      ctx.fill();
    }

    // Очистить canvas при размонтировании компонента
    return () => {
      canvas.removeEventListener("wheel", wheel);
      canvas.removeEventListener("mousemove", mousemove);
      canvas.removeEventListener("mouseleave", mouseleave);
      canvas.removeEventListener("mouseup", mouseup);
      canvas.removeEventListener("mousedown", mousedown);
    };
  }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только один раз

  return <canvas ref={canvasRef} />;
}

export default Graph;
