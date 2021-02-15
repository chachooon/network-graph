import { SimulationNodeDatum } from "d3-force";
import { InputData, Node } from "model";

export function getViewBox(
  nodes: SimulationNodeDatum[],
  padding: number = 0.3
): string {
  const sizeX = (1 + padding) * Math.max(...nodes.map((x) => Math.abs(x.x!)));
  const sizeY = (1 + padding) * Math.max(...nodes.map((x) => Math.abs(x.y!)));

  const viewBox = {
    cx: -sizeX,
    cy: -sizeY,
    height: sizeY * 2,
    width: sizeX * 2,
  };
  return `${viewBox.cx} ${viewBox.cy} ${viewBox.width} ${viewBox.height}`;
}

export function getRandomColor(str: string): string {
  const colors = [
    "#FAD2A7",
    "#FBEAC8",
    "#B1D9CD",
    "#93C2C6",
    "#C8F69B",
    "#FFEEA5",
    "#FFCBA5",
    "#FFB1AF",
    "#D6D4FF",
    "#B3EEFF",
    "#ECBF97",
    "#EDDDC4",
    "#DFC2C3",
    "#81BAC2",
    "#BF818E",
    "#FDB196",
  ];

  let hash = 0;
  if (str.length === 0) return "#FFF";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
}

export function makeData(inputData: InputData[]): Node[] {
  const nodeTypeCheck = new Set<string>();
  const nodeMap = new Map<string, Node>();

  inputData.forEach((data, index) => {
    const tempData = {};
    ["left", "right", "center", "bottom"].forEach((key) => {
      const node = {
        ...data[key],
        id: data[key].name,
        dependsOn: [],
        type: key,
      };

      // 같은위치에 같은 이름의 노드인 경우 id 값 변경
      if (nodeTypeCheck.has(`${node.id}_${key}`)) {
        node.id = `${node.id}_${index}`;
      }
      nodeTypeCheck.add(`${node.id}_${key}`);
      // 이미 생성된 Node의 dependsOn 가져오기
      if (nodeMap.has(node.id)) {
        node.dependsOn = [...nodeMap.get(node.id).dependsOn];
      }
      nodeMap.set(node.id, node);
      tempData[key] = node;
    });
    // Link(dependsOn) 데이터 생성
    const center = nodeMap.get(tempData["center"].id);
    center.dependsOn = [tempData["left"].id, tempData["right"].id];
    nodeMap.set(center.id, center);
    const bottom = nodeMap.get(tempData["bottom"].id);
    bottom.dependsOn = [...bottom.dependsOn, tempData["center"].id];
    nodeMap.set(bottom.id, bottom);
  });
  return Array.from(nodeMap.values());
}

export const initialData: InputData[] = [
  {
    left: { id: "", name: "N1", size: 40, dependsOn: [] },
    right: { id: "", name: "N2", size: 45, dependsOn: [] },
    center: { id: "", name: "C1", dependsOn: ["N1", "N2"] },
    bottom: { id: "", name: "N3", size: 50, dependsOn: ["C1"] },
  },
  {
    left: { id: "", name: "N3", size: 50, dependsOn: [] },
    right: { id: "", name: "N4", size: 45, dependsOn: [] },
    center: { id: "", name: "C2", dependsOn: ["N3", "N4"] },
    bottom: { id: "", name: "N5", size: 40, dependsOn: ["C2"] },
  },
  {
    left: { id: "", name: "N6", size: 40, dependsOn: [] },
    right: { id: "", name: "N4", size: 40, dependsOn: [] },
    center: { id: "", name: "C3", dependsOn: ["N6", "N4"] },
    bottom: { id: "", name: "N8", size: 50, dependsOn: ["C3"] },
  },
  {
    left: { id: "", name: "N5", size: 45, dependsOn: [] },
    right: { id: "", name: "N8", size: 45, dependsOn: [] },
    center: { id: "", name: "C4", dependsOn: ["N5", "N8"] },
    bottom: { id: "", name: "N9", size: 50, dependsOn: ["C4"] },
  },
];
