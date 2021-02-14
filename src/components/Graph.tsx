import React, { useState, useEffect, useCallback } from "react";
import {
  forceLink,
  forceManyBody,
  forceSimulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3-force";
import { Rect, Circle } from "./Node";
import { Node } from "../model";

const Graph: React.FC<{ nodesData: Node[] }> = ({ nodesData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([...nodesData]);
  const [links, setLinks] = useState<
    SimulationLinkDatum<SimulationNodeDatum>[]
  >([]);

  useEffect(() => {
    setIsLoading(true);
    const links: SimulationLinkDatum<SimulationNodeDatum>[] = [];
    nodesData
      .filter((x) => x.dependsOn.length > 0)
      .forEach((node: Node) => {
        node.dependsOn.forEach((source: string) => {
          links.push({
            source: source,
            target: node.id,
          });
        });
      });
    const simulation = forceSimulation(nodesData)
      .force(
        "link",
        forceLink()
          .id((d: any) => d.id)
          .links(links)
          .distance(100)
          .strength(0.9)
      )
      .force("charge", forceManyBody().strength(-700));
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
    <svg
      className="container"
      height="500"
      width="500"
      style={{ border: "1px solid #000" }}
      viewBox={getViewBox(nodes)}
    >
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
function getViewBox(
  nodes: SimulationNodeDatum[],
  padding: number = 0.1
): string {
  const size =
    (1 + padding) *
    Math.max(
      Math.max(...nodes.map((x) => Math.abs(x.x!))),
      Math.max(...nodes.map((x) => Math.abs(x.y!)))
    );
  const viewBox = {
    cx: -size,
    cy: -size,
    height: size * 2,
    width: size * 2,
  };
  return `${viewBox.cx} ${viewBox.cy} ${viewBox.width} ${viewBox.height}`;
}

export default Graph;
