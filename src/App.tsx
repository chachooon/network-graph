import Container from "components/Container";
import React, { useState, useEffect } from "react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
import { InputData, Node } from "model";
import Table from "components/Table";
import styled from "@emotion/styled";

const initialData: InputData[] = [
  {
    left: { id: "", name: "N1", size: 30, dependsOn: [] },
    right: { id: "", name: "N2", size: 30, dependsOn: [] },
    center: { id: "", name: "C1", dependsOn: ["N1", "N2"] },
    bottom: { id: "", name: "N3", size: 30, dependsOn: ["C1"] },
  },
  {
    left: { id: "", name: "N3", size: 30, dependsOn: [] },
    right: { id: "", name: "N4", size: 30, dependsOn: [] },
    center: { id: "", name: "C2", dependsOn: ["N3", "N4"] },
    bottom: { id: "", name: "N5", size: 30, dependsOn: ["C2"] },
  },
  {
    left: { id: "", name: "N6", size: 30, dependsOn: [] },
    right: { id: "", name: "N4", size: 30, dependsOn: [] },
    center: { id: "", name: "C3", dependsOn: ["N6", "N4"] },
    bottom: { id: "", name: "N8", size: 30, dependsOn: ["C3"] },
  },
  {
    left: { id: "", name: "N5", size: 30, dependsOn: [] },
    right: { id: "", name: "N8", size: 30, dependsOn: [] },
    center: { id: "", name: "C4", dependsOn: ["N5", "N8"] },
    bottom: { id: "", name: "N9", size: 30, dependsOn: ["C4"] },
  },
];
export default function App() {
  const [saved, setSaved] = useState<boolean>(true);
  const [tableData, setTableData] = useState<InputData[]>(initialData);
  const [nodesData, setNodesData] = useState<Node[]>(makeData(tableData));

  const handleChange = (idx: number, key: string, value: string | number) => {
    const nextData = [...tableData];
    if (key === "L_Node") nextData[idx].left.name = String(value);
    if (key === "L_Weight") nextData[idx].left.size = Number(value);
    if (key === "R_Node") nextData[idx].right.name = String(value);
    if (key === "R_Weight") nextData[idx].right.size = Number(value);
    if (key === "Condition") nextData[idx].center.name = String(value);
    if (key === "F_Node") nextData[idx].bottom.name = String(value);
    if (key === "F_Weight") nextData[idx].bottom.size = Number(value);
    setTableData(nextData);
    setSaved(false);
  };
  const handleDelRow = (idx: number) => {
    setTableData([
      ...tableData.slice(0, idx),
      ...tableData.slice(idx + 1, tableData.length),
    ]);
  };
  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        left: { id: "", name: "", size: 0, dependsOn: [] },
        right: { id: "", name: "", size: 0, dependsOn: [] },
        center: { id: "", name: "", size: 0, dependsOn: [] },
        bottom: { id: "", name: "", size: 0, dependsOn: [] },
      },
    ]);
  };
  const handleSaveRow = () => {
    const generatedData = makeData(tableData);
    if (generatedData) {
      setNodesData(generatedData);
    } else {
      alert("데이터 양식 올바르지 않습니다.");
    }
  };

  useEffect(() => setSaved(false), [tableData]);

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
          tbodyData={tableData}
          onChange={handleChange}
          onDelete={handleDelRow}
        />
        <Button onClick={handleAddRow}>데이터 추가</Button>
        <Button onClick={handleSaveRow}>저장</Button>
      </Container>
    </PortalProvider>
  );
}

function makeData(inputData: InputData[]): Array<Node> {
  const nodeTypeCheck = new Set<string>();
  const nodeMap = new Map<string, Node>();

  console.log(inputData);

  inputData.forEach((data, index) => {
    const tempData = {};
    ["left", "right", "center", "bottom"].forEach((key) => {
      const node = {
        ...data[key],
        id: data[key].name,
        type: key === "center" ? "rect" : "circle",
      };
      // 같은위치에 같은 이름의 노드인 경우 id 값 변경
      if (nodeTypeCheck.has(`${node.id}_${key}`)) {
        node.id = `${node.id}_${index}`;
      }
      nodeTypeCheck.add(`${node.id}_${key}`);

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

    // console.log(Array.from(nodeMap.values()));
  });

  return Array.from(nodeMap.values());
}

const Button = styled.button`
  margin: 10px;
  width: 100px;
`;
