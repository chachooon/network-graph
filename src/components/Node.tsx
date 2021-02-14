import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { InputData, NodesData, Link, Node } from "../model";
interface Props extends Node {
  onChange: Function;
}
export function Rect({ id, x, y, size, onChange }: Props) {
  const wrapper = useRef<SVGRectElement>();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", (event) => onChange(id, event));
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

export function Circle({ id, x, y, size, onChange }: Props) {
  const wrapper = useRef<SVGCircleElement>();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", (event) => onChange(id, event));
    handleDrag(d3.select(wrapper.current));
  }, []);

  return (
    <circle ref={wrapper} cx={x} cy={y} r={size} fill="#FFF" stroke="#000" />
  );
}
