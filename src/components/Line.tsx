import { Node } from "model";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3-force";

export default function Line({
  source,
  target,
  index,
}: SimulationLinkDatum<SimulationNodeDatum>) {
  const getCurve = (s: number[], t: number[]) => {
    const a = 7;

    return `M${s[0]},${s[1]} 
    C${(s[0] + t[0]) / 2 + a},${(s[1] + t[1]) / 2 + a} ${
      (s[0] + t[0]) / 2 - a
    },${(s[1] + t[1]) / 2 - a} ${t[0]},${t[1]}`;
  };
  let curve = getCurve([source["x"], source["y"]], [target["x"], target["y"]]);

  if (source["type"] === "left" || source["type"] === "right") {
    curve = getCurve(
      [source["x"], source["y"] + source["size"]],
      [target["x"], target["y"] - 35]
    );
  }
  if (source["type"] === "center") {
    curve = getCurve(
      [source["x"], source["y"] + 35],
      [target["x"], target["y"] - target["size"]]
    );
  }

  return (
    <path
      d={curve}
      fill="none"
      stroke="#000"
      opacity="0.7"
      markerEnd="url(#suit)"
      key={`line-${index}`}
    />
  );
}
