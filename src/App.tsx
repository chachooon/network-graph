import Container from "components/Container";
import React, { useState, useEffect } from "react";
import normalize from "emotion-normalize";
import { css, Global } from "@emotion/react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
import { InputData, Node } from "model";

export default function App() {
  const [data, setData] = useState<InputData[]>([
    {
      left: { id: "N1", name: "N1", size: 10, type: "circle", dependsOn: [] },
      right: { id: "N2", name: "N2", size: 10, type: "circle", dependsOn: [] },
      center: {
        id: "C1",
        name: "C1",
        size: 10,
        type: "rect",
        dependsOn: ["N1", "N2"],
      },
      bottom: {
        id: "N3",
        name: "N3",
        size: 10,
        type: "circle",
        dependsOn: ["C1"],
      },
    },
  ]);
  const [nodesData, setNodesData] = useState<Node[]>(makeData(data));

  return (
    <PortalProvider>
      <Global
        styles={css`
          ${normalize}
          h1, h2, h3, h4, h5, h6 {
            font-size: 1em;
            font-weight: normal;
            margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
          }
        `}
      />
      <Container>
        <div
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Graph nodesData={nodesData} />
        </div>
      </Container>
    </PortalProvider>
  );
}

function makeData(inputData: InputData[]): Array<Node> {
  const nodeTypeCheck = new Set<string>();
  const nodeMap = new Map<string, Node>();

  inputData.forEach((data) => {
    const tempData = {};
    ["left", "right", "center", "bottom"].forEach((key) => {
      const node = {
        ...data[key],
        id: data[key].name,
        dependsOn: [],
        type: key === "center" ? "rect" : "circle",
      };
      if (nodeTypeCheck.has(`${node.id}_${key}`)) {
        node.id = `${node.id}_${key}`;
      }
      nodeTypeCheck.add(`${node.id}_${key}`);
      nodeMap.set(node.id, node);
      tempData[key] = node;
    });
    // Link(dependsOn) 데이터 생성
    const center = nodeMap.get(tempData["center"].id);
    center.dependsOn = [tempData["left"].id, tempData["right"].id];
    nodeMap.set(tempData["center"].id, center);
    const bottom = nodeMap.get(tempData["bottom"].id);
    bottom.dependsOn = [tempData["center"].id];
    nodeMap.set(tempData["bottom"].id, bottom);
    console.log(Array.from(nodeMap.values()));
  });

  return Array.from(nodeMap.values());
}
