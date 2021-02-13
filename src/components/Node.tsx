import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export function Rect({ x, y, size }: any) {
  const wrapper = useRef<SVGRectElement>();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", function (event) {
      d3.select(this).attr("x", event.x).attr("y", event.y);
    });
    handleDrag(d3.select(wrapper.current));
  }, []);

  return (
    <rect
      ref={wrapper}
      x={x}
      y={y}
      width={size}
      height={size}
      fill="#FFF"
      stroke="#000"
    />
  );
}

export function Circle({ x, y, size }: any) {
  const wrapper = useRef<SVGCircleElement>();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", function (event) {
      d3.select(this).attr("x", event.x).attr("y", event.y);
    });
    handleDrag(d3.select(wrapper.current));
  }, []);

  return (
    <circle ref={wrapper} cx={x} cy={y} r={size} fill="#FFF" stroke="#000" />
  );
}
