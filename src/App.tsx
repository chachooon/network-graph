import Container from "components/Container";
import React, { useState, useEffect } from "react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
import { InputData, Node } from "model";
import Table from "components/Table";
import styled from "@emotion/styled";
import { makeData, initialData } from "utils";

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

const Button = styled.button`
  margin: 10px;
  width: 100px;
`;
