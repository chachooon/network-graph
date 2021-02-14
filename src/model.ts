import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

export interface Node extends SimulationNodeDatum {
  id: string;
  name: string;
  size?: number;
  type?: "rect" | "circle";
}
export interface Link extends SimulationLinkDatum<SimulationNodeDatum> {
  type?: "left" | "right" | "bottom";
}
export interface NodesData {
  nodes: Node[];
  links: Link[];
}
// export interface InputData {
//   L_Node: string;
//   L_Weight: number;
//   R_Node: string;
//   R_Weight: number;
//   Condition: string;
//   F_Node: string;
//   F_Weight: number;
// }

export interface InputData {
  left: Node;
  right: Node;
  center: Node;
  bottom: Node;
}
