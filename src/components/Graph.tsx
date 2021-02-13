import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import {
  forceSimulation,
  forceLink,
  forceCollide,
  forceX,
  forceY,
  forceManyBody,
  forceCenter,
} from "d3-force";
import { Rect, Circle } from "./Node";
import { Node } from "model";
interface Props {
  radius: number;
  nodes: Array<any>;
}

export default function Graph(props: Props) {
  const [nodes, setNodes] = useState<Array<any>>(props.nodes);
  const [links, setLinks] = useState<Array<any>>([]);
  const w = 600,
    h = 600;
  useEffect(() => {
    const tempLinks: Array<any> = [];
    nodes.forEach((node) => {
      if (!node.dependsOn) return;

      node.dependsOn.forEach((index: number) => {
        tempLinks.push({ source: index, target: node.id });
      });
    });
    setLinks(tempLinks);

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink()
          .id((d: any) => d.id)
          .links(tempLinks)
        // .distance(100)
        // .strength(0.9)
      )
      .force("center", forceCenter(w / 2, h / 2))
      .force("collide", forceCollide(50))
      .force("charge", forceManyBody().strength(-1500))
      .on("tick", () => {
        setNodes(nodes);
        setLinks(tempLinks);
      })
      .on("end", () => console.log("simulation end"));

    return () => {
      simulation.stop();
    };
  }, []);

  const handleDragged = useCallback((id: number, event: DragEvent) => {
    setNodes(
      nodes.map((n) => {
        if (n.id === id) {
          n.x = event.x;
          n.y = event.y;
        }
        return n;
      })
    );
  }, []);

  return (
    <svg className="container" height={h} width={w}>
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
      <g>
        {nodes.map((node, idx) => (
          <g key={idx}>
            {node.type === "rect" ? (
              <Rect {...node} onChange={handleDragged} />
            ) : (
              <Circle {...node} onChange={handleDragged} />
            )}
            <text textAnchor="middle" x={node.x} y={node.y}>
              {node.name}
            </text>
          </g>
        ))}
        {links.map((link, index) => {
          return (
            <line
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              key={`line-${index}`}
              stroke="#4679BD"
              markerEnd="url(#suit)"
            />
          );
        })}
      </g>
    </svg>
  );
}
