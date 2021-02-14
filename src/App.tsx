import Container from "components/Container";
import React, { useState, useEffect } from "react";
import normalize from "emotion-normalize";
import { css, Global } from "@emotion/react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
import { InputData, NodesData, Link, Node } from "model";

export default function App() {
  const [data, setData] = useState<InputData[]>([
    {
      left: { id: "N1", name: "N1", size: 10, type: "circle" },
      right: { id: "N2", name: "N2", size: 10, type: "circle" },
      center: { id: "C1", name: "C1", size: 10, type: "rect" },
      bottom: { id: "N3", name: "N3", size: 10, type: "circle" },
    },
  ]);
  const [nodesData, setNodesData] = useState<NodesData>(makeData(data));

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

function makeData(inputData: InputData[]): NodesData {
  const nodeSet = new Set<Node>();
  const nodeTypeCheck = new Set<string>();
  const links: Link[] = [];

  inputData.forEach((data) => {
    ["left", "right", "center", "bottom"].forEach((key) => {
      const node = { ...data[key] };
      if (nodeTypeCheck.has(`${node.id}_${key}_${node.size}`)) {
        node.id = `${node.id}_${key}_${node.size}`;
      }

      nodeTypeCheck.add(node.id);
      nodeSet.add(node);

      if (key === "bottom") {
        links.push({ source: data["center"], target: node });
      }
      if (key === "left" || key === "right") {
        links.push({ source: node, target: data["center"] });
      }
    });
  });

  return { nodes: Array.from(nodeSet), links };
}
