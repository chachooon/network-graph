import { useRef, useEffect, SVGAttributes } from "react";
import { SimulationNodeDatum } from "d3-force";
import * as d3 from "d3";
import { Node } from "../model";
interface Props extends Node {
  id: string;
  fill: string;
  onChange: Function;
}
export function Rect({ id, x, y, size = 70, fill = "#FFF", onChange }: Props) {
  const wrapper = useRef<SVGRectElement>();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", (event) => onChange(id, event));
    handleDrag(d3.select(wrapper.current));
  }, []);

  return (
    <>
      {x && (
        <rect
          ref={wrapper}
          x={x - size / 2}
          y={y - size / 2}
          width={size}
          height={size}
          fill={fill}
          stroke="#000"
          style={{ cursor: "pointer" }}
        />
      )}
    </>
  );
}

export function Circle({ id, x, y, size, fill = "#FFF", onChange }: Props) {
  const wrapper = useRef<SVGCircleElement>();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", (event) => onChange(id, event));
    handleDrag(d3.select(wrapper.current));
  }, []);

  return (
    <circle
      ref={wrapper}
      cx={x}
      cy={y}
      r={size}
      fill={fill}
      stroke="#000"
      style={{ cursor: "pointer" }}
    />
  );
}
