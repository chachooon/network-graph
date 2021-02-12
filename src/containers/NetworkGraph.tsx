import styled from "@emotion/styled";
import Table from "components/Table";
import React, { Fragment, useState, useEffect } from "react";

export default function NetworkGraph() {
  const [tbodyData, setTbodyData] = useState<Array<any>>([
    {
      id: "1",
      items: ["John", "john@email.com", "01/01/2021"],
    },
    {
      id: "2",
      items: ["Sally", "sally@email.com", "12/24/2020"],
    },
    {
      id: "3",
      items: ["Maria", "maria@email.com", "12/01/2020"],
    },
  ]);
  const theadData = [
    "L_Node",
    "L_Weight",
    "R_Node",
    "R_Weight",
    "Condition",
    "F_Node",
    "F_Weight",
  ];

  return (
    <>
      <TableContainer>
        <Table theadData={theadData} tbodyData={tbodyData} />
      </TableContainer>
    </>
  );
}

const TableContainer = styled.div`
  margin: 0;
  padding: 0;
`;
