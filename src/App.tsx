import Container from "components/Container";
import React, { useState, useEffect } from "react";
import normalize from "emotion-normalize";
import { css, Global } from "@emotion/react";
import { PortalProvider } from "providers/PortalProvider";
import Graph from "components/Graph";
import useSimulation from "./hooks/useSimulation";
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
  const [data, setData] = useState({
    links: [
      {
        source: 1,
        target: 2,
      },
      {
        source: 1,
        target: 3,
      },
      {
        source: 3,
        target: 4,
      },
      {
        source: 3,
        target: 5,
      },
    ],
    nodes: [
      {
        id: 1,
        data: {
          type: "function",
          startTime: 214235243525,
          endTime: 214235244525,
          name: "customer-test-dev-rellyrivlin-customer-test",
          memoryAllocated: "1024",
          runtime: "AWS_Lambda_nodejs6.10",
          cold: true,
          arn:
            "arn:aws:lambda:eu-west-1:362265614766:function:customer-test-dev-rellyrivlin-customer-test",
        },
      },
      {
        id: 2,
        data: {
          type: "function",
          startTime: 214235243525,
          endTime: 214235244525,
          name: "customer-test-dev-rellyrivlin-customer-test",
          memoryAllocated: "1024",
          runtime: "AWS_Lambda_nodejs6.10",
          cold: true,
          arn:
            "arn:aws:lambda:eu-west-1:362265614766:function:customer-test-dev-rellyrivlin-customer-test",
        },
      },
      {
        id: 3,
        data: {
          type: "function",
          startTime: 214235243525,
          endTime: 214235244525,
          name: "customer-test-dev-rellyrivlin-customer-test",
          memoryAllocated: "1024",
          runtime: "AWS_Lambda_nodejs6.10",
          cold: true,
          arn:
            "arn:aws:lambda:eu-west-1:362265614766:function:customer-test-dev-rellyrivlin-customer-test",
        },
      },
      {
        id: 4,
        data: {
          type: "function",
          startTime: 214235243525,
          endTime: 214235244525,
          name: "customer-test-dev-rellyrivlin-customer-test",
          memoryAllocated: "1024",
          runtime: "AWS_Lambda_nodejs6.10",
          cold: true,
          arn:
            "arn:aws:lambda:eu-west-1:362265614766:function:customer-test-dev-rellyrivlin-customer-test",
        },
      },
      {
        id: 5,
        data: {
          type: "function",
          startTime: 214235243525,
          endTime: 214235244525,
          name: "customer-test-dev-rellyrivlin-customer-test",
          memoryAllocated: "1024",
          runtime: "AWS_Lambda_nodejs6.10",
          cold: true,
          arn:
            "arn:aws:lambda:eu-west-1:362265614766:function:customer-test-dev-rellyrivlin-customer-test",
        },
      },
    ],
  });
  const [nodes, links] = useSimulation(data);
  useEffect(() => {
    console.log(nodes);
    console.log(links);
  }, []);

  return (
    <div style={{ border: "1px solid black" }}>
      <svg id="#map" width={width} height={height}>
        <defs>
          <marker
            id="suit"
            viewBox="0 -5 10 10"
            refX={12}
            refY={0}
            markerWidth={12}
            markerHeight={12}
            orient="auto"
          >
            <path
              d="M0,-5L10,0L0,5 L10,0 L0, -5"
              stroke="#4679BD"
              opacity={0.6}
            />
          </marker>
        </defs>
        <g transform={`translate(${width / 2} ${height / 2} )`}>
          {links.map((link, idx) => {
            if (link.index) {
              return (
                <line
                  x1={link.source.x}
                  y1={link.source.y}
                  x2={link.target.x}
                  y2={link.target.y}
                  key={`line-${idx}`}
                  stroke="#4679BD"
                  markerEnd="url(#suit)"
                />
              );
              // return <Link key={idx} link={link} />;
            }
          })}
          {nodes.map((node) => {
            if (node.x) {
              return (
                <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                  <rect
                    width="20"
                    height="20"
                    stroke="blue"
                    fill="white"
                    strokeWidth="1"
                  />
                  <text
                    dy={".33em"}
                    fontSize={9}
                    x={10}
                    y={10}
                    textAnchor="middle"
                    style={{ pointerEvents: "none" }}
                    fill="black"
                  >
                    {node.id}
                  </text>
                </g>
              );
            }
          })}
        </g>
      </svg>
    </div>
  );

  // return (
  //   <PortalProvider>
  //     <Global
  //       styles={css`
  //         ${normalize}
  //         h1, h2, h3, h4, h5, h6 {
  //           font-size: 1em;
  //           font-weight: normal;
  //           margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
  //         }
  //       `}
  //     />
  //     <Container>
  //       <div
  //         style={{
  //           fontFamily: "sans-serif",
  //           textAlign: "center",
  //           height: "100%",
  //           width: "100%",
  //         }}
  //       >
  //         <Graph
  //           radius={100}
  //           nodes={[
  //             { id: 1, name: "node 1", dependsOn: [] },
  //             { id: 7, name: "node 7", dependsOn: [] },
  //             { id: 2, name: "node 2", dependsOn: [1] },
  //             { id: 3, name: "node 3", dependsOn: [2] },
  //             { id: 4, name: "node 4", dependsOn: [2] },
  //             { id: 5, name: "node 5", dependsOn: [4, 7] },
  //             { id: 6, name: "node 6", dependsOn: [5] },
  //           ]}
  //           // nodes={[
  //           //   { id: 1, name: "node 1", dependsOn: [] },
  //           //   { id: 2, name: "node 2", dependsOn: [1] },
  //           //   { id: 3, name: "node 3", dependsOn: [2] },
  //           // { id: 4, name: "node 4", dependsOn: [3] },
  //           // { id: 5, name: "node 5", dependsOn: [4] },
  //           // { id: 6, name: "node 6", dependsOn: [5] }
  //           // ]}
  //           // nodes={[
  //           //   { id: 1, name: "node 1", dependsOn: [] },
  //           //   { id: 2, name: "node 2", dependsOn: [1] },
  //           //   { id: 3, name: "node 3", dependsOn: [1] },
  //           //   { id: 4, name: "node 3", dependsOn: [2] },
  //           // ]}
  //         />
  //       </div>
  //     </Container>
  //   </PortalProvider>
  // );
}
