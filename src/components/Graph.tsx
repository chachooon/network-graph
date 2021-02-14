import React, { useState, useEffect, useCallback } from "react";
import {
  forceLink,
  forceCenter,
  forceCollide,
  forceManyBody,
  forceSimulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
  Simulation,
} from "d3-force";
import { Rect, Circle } from "./Node";
import { NodesData, Node, Link } from "../model";

const Graph: React.FC<{ nodesData: NodesData }> = ({ nodesData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([...nodesData.nodes]);
  const [links, setLinks] = useState<Link[]>([...nodesData.links]);

  const w = 1200,
    h = 1200;
  useEffect(() => {
    const simulation = forceSimulation(nodesData.nodes)
      .force(
        "link",
        forceLink()
          .id((d: any) => d.id)
          .links(links)
          .distance(100)
          .strength(0.9)
      )
      .force("center", forceCenter(w / 2, h / 2))
      .force("collide", forceCollide(50))
      .force("charge", forceManyBody().strength(-1500));

    simulation.on("tick", () => {
      setNodes([...simulation.nodes()]);
    });
    simulation.on("end", () => {
      setNodes([...simulation.nodes()]);
      setLinks(links);
      setIsLoading(false);
    });

    return () => {
      simulation.stop();
    };
  }, [nodesData]);

  const handleDragged = useCallback((id: string, event: DragEvent) => {
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
          console.log(link);
          return (
            <line
              x1={link.source["x"]}
              y1={link.source["y"]}
              x2={link.target["x"]}
              y2={link.target["y"]}
              key={`line-${index}`}
              stroke="#4679BD"
              markerEnd="url(#suit)"
            />
          );
        })}
      </g>
    </svg>
  );
};
export default Graph;
