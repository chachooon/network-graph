import { SimulationNodeDatum } from "d3-force";

export interface Node extends SimulationNodeDatum {
  id: string;
  name: string;
  size?: number;
  type?: "left" | "right" | "center" | "bottom";
  dependsOn?: string[];
}

export interface InputData {
  left: Node;
  right: Node;
  center: Node;
  bottom: Node;
}
