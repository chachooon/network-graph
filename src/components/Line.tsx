import { Node } from "model";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3-force";

export default function Line({
  source,
  target,
  index,
}: SimulationLinkDatum<SimulationNodeDatum>) {
  if (source["type"] === "left" || source["type"] === "right") {
    return (
      <line
        d={`M${source["x"]},${source["y"] + source["size"]}L${target["x"]},${
          target["y"] - 35
        }}`}
        x1={source["x"]}
        y1={source["y"] + source["size"]}
        x2={target["x"]}
        y2={target["y"] - 35}
        key={`line-${index}`}
        stroke="#000"
        opacity="0.5"
        markerEnd="url(#suit)"
      />
    );
  }

  if (source["type"] === "center") {
    return (
      <line
        x1={source["x"]}
        y1={source["y"] + 35}
        x2={target["x"]}
        y2={target["y"] - target["size"]}
        key={`line-${index}`}
        stroke="#000"
        opacity="0.5"
        markerEnd="url(#suit)"
      />
    );
  }
  return (
    <line
      x1={source["x"]}
      y1={source["y"]}
      x2={target["x"]}
      y2={target["y"]}
      key={`line-${index}`}
      stroke="#000"
      opacity="0.5"
      markerEnd="url(#suit)"
    />
  );
}
