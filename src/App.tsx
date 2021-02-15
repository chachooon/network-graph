import Container from "components/Container";
import React, { useState, useEffect } from "react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
import { InputData, Node } from "model";
import Table from "components/Table";
const initialData: InputData[] = [
  {
    left: { id: "N1", name: "N1", size: 30, type: "circle", dependsOn: [] },
    right: { id: "N2", name: "N2", size: 30, type: "circle", dependsOn: [] },
    center: {
      id: "C1",
      name: "C1",
      size: 30,
      type: "rect",
      dependsOn: ["N1", "N2"],
    },
    bottom: {
      id: "N3",
      name: "N3",
      size: 30,
      type: "circle",
      dependsOn: ["C1"],
    },
  },
  {
    left: { id: "N3", name: "N3", size: 30, type: "circle", dependsOn: [] },
    right: { id: "N4", name: "N4", size: 30, type: "circle", dependsOn: [] },
    center: {
      id: "C2",
      name: "C2",
      size: 30,
      type: "rect",
      dependsOn: ["N3", "N4"],
    },
    bottom: {
      id: "N5",
      name: "N5",
      size: 30,
      type: "circle",
      dependsOn: ["C2"],
    },
  },
  {
    left: { id: "N6", name: "N6", size: 30, type: "circle", dependsOn: [] },
    right: { id: "N4", name: "N4", size: 30, type: "circle", dependsOn: [] },
    center: {
      id: "C3",
      name: "C3",
      size: 30,
      type: "rect",
      dependsOn: ["N6", "N4"],
    },
    bottom: {
      id: "N8",
      name: "N8",
      size: 30,
      type: "circle",
      dependsOn: ["C3"],
    },
  },
  {
    left: { id: "N5", name: "N5", size: 30, type: "circle", dependsOn: [] },
    right: { id: "N8", name: "N8", size: 30, type: "circle", dependsOn: [] },
    center: {
      id: "C4",
      name: "C4",
      size: 30,
      type: "rect",
      dependsOn: ["N5", "N8"],
    },
    bottom: {
      id: "N9",
      name: "N9",
      size: 30,
      type: "circle",
      dependsOn: ["C4"],
    },
  },
];
export default function App() {
  const [data, setData] = useState<InputData[]>(initialData);
  const [nodesData, setNodesData] = useState<Node[]>(makeData(data));

  const handleChange = (idx: number, key: string, value: string | number) => {
    const nextData = [...data];
    if (key === "L_Node") nextData[idx].left.name = String(value);
    if (key === "L_Weight") nextData[idx].left.size = Number(value);
    if (key === "R_Node") nextData[idx].right.name = String(value);
    if (key === "R_Weight") nextData[idx].right.size = Number(value);
    if (key === "Condition") nextData[idx].center.name = String(value);
    if (key === "F_Node") nextData[idx].bottom.name = String(value);
    if (key === "F_Weight") nextData[idx].bottom.size = Number(value);
    setData(nextData);
    setNodesData(makeData(nextData));
  };

  return (
    <PortalProvider>
      <Container>
        <h1>그래프 구현 과제</h1>
        <Graph nodesData={nodesData} />
        <Table
          theadData={[
            "L_Node",
            "L_Weight",
            "R_Node",
            "R_Weight",
            "Condition",
            "F_Node",
            "F_Weight",
          ]}
          tbodyData={data}
          onChange={handleChange}
        />
      </Container>
    </PortalProvider>
  );
}

function makeData(inputData: InputData[]): Array<Node> {
  const nodeTypeCheck = new Set<string>();
  const nodeMap = new Map<string, Node>();

  console.log(inputData);

  inputData.forEach((data) => {
    const newData = {};
    ["left", "right", "center", "bottom"].forEach((key) => {
      const node = {
        ...data[key],
        type: key === "center" ? "rect" : "circle",
      };

      if (nodeTypeCheck.has(`${node.id}_${key}`)) node.id = `${node.id}_${key}`;
      nodeTypeCheck.add(`${node.id}_${key}`);

      if (nodeMap.has(node.id)) {
        const temp = nodeMap.get(node.id);
        temp.dependsOn = temp.dependsOn
          ? [...temp.dependsOn, node.id]
          : [node.id];
      }

      nodeMap.set(node.id, node);
      newData[key] = node;
    });
    // Link(dependsOn) 데이터 생성
    const center = nodeMap.get(newData["center"].id);
    center.dependsOn = [newData["left"].id, newData["right"].id];
    nodeMap.set(newData["center"].id, center);

    console.log(Array.from(nodeMap.values()));
  });

  return Array.from(nodeMap.values());
}
