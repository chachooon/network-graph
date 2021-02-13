import Container from "components/Container";
import React, { useState, useEffect } from "react";
import normalize from "emotion-normalize";
import { css, Global } from "@emotion/react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
// import useSimulation from "./hooks/useSimulation";
import * as d3 from "d3";
const width = 500;
const height = 500;

const Link = ({ link }: any) => {
  const path: any = d3.path();
  path.moveTo(link.source.x + 10, link.source.y + 10);
  path.lineTo(link.target.x + 10, link.target.y + 10);

  return (
    <marker
      id="arrow"
      markerWidth="40"
      markerHeight="30"
      refX="25"
      refY="-5"
      orient="auto"
      markerUnits="userSpaceOnUse"
      overflow="visible"
    >
      <path stroke="blue" strokeWidth="1" d={path} />
    </marker>
  );
};

export default function App() {
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
          <Graph
            radius={100}
            nodes={[
              { id: 1, name: "node 1", dependsOn: [], type: "rect", size: 30 },
              { id: 7, name: "node 7", dependsOn: [], type: "rect", size: 30 },
              { id: 2, name: "node 2", dependsOn: [1], type: "rect", size: 30 },
              { id: 3, name: "node 3", dependsOn: [2], type: "rect", size: 30 },
              { id: 4, name: "node 4", dependsOn: [2], type: "rect", size: 30 },
              {
                id: 5,
                name: "node 5",
                dependsOn: [4, 7],
                type: "rect",
                size: 30,
              },
              { id: 6, name: "node 6", dependsOn: [5], type: "rect", size: 30 },
            ]}
          />
        </div>
      </Container>
    </PortalProvider>
  );
}
