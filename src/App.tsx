import Container from "components/Container";
import React, { useState, useEffect } from "react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
import { InputData, Node } from "model";
import Table from "components/Table";
import styled from "@emotion/styled";
import { makeData, initialData } from "utils";

export default function App() {
  const [saved, setSaved] = useState<boolean>(false);
  const [tableData, setTableData] = useState<InputData[]>(initialData);
  const [nodesData, setNodesData] = useState<Node[]>(null);

  const handleChange = (i: number, key: string, val: string | number) => {
    const nextData = [...tableData];
    if (key === "L_Node") nextData[i].left.name = String(val);
    if (key === "L_Weight") nextData[i].left.size = Number(val);
    if (key === "R_Node") nextData[i].right.name = String(val);
    if (key === "R_Weight") nextData[i].right.size = Number(val);
    if (key === "Condition") nextData[i].center.name = String(val);
    if (key === "F_Node") nextData[i].bottom.name = String(val);
    if (key === "F_Weight") nextData[i].bottom.size = Number(val);
    setTableData(nextData);
    setSaved(true);
  };
  const handleDelRow = (idx: number) => {
    setTableData([
      ...tableData.slice(0, idx),
      ...tableData.slice(idx + 1, tableData.length),
    ]);
    setSaved(true);
  };
  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        left: { id: "", name: "", size: 30, dependsOn: [] },
        right: { id: "", name: "", size: 30, dependsOn: [] },
        center: { id: "", name: `C${tableData.length + 1}`, dependsOn: [] },
        bottom: { id: "", name: "", size: 30, dependsOn: [] },
      },
    ]);
    setSaved(true);
  };
  const handleSaveRow = () => {
    const generatedData = makeData(tableData);
    if (generatedData) {
      setNodesData(generatedData);
      setSaved(false);
    } else {
      alert("데이터 양식 올바르지 않습니다.");
    }
  };
  useEffect(() => setNodesData(makeData(tableData)), []);
  return (
    <PortalProvider>
      <Container>
        <h1>그래프 구현 과제</h1>
        {nodesData && <Graph nodesData={nodesData} />}
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
        <Button onClick={handleSaveRow} disabled={!saved}>
          저장
        </Button>
      </Container>
    </PortalProvider>
  );
}

const Button = styled.button`
  margin: 10px;
  width: 100px;
`;
