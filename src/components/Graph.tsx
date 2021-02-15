import React, { useState, useEffect, useCallback } from "react";
import {
  forceLink,
  forceCollide,
  forceCenter,
  forceSimulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3-force";
import { Rect, Circle } from "./Node";
import { Node } from "../model";
import Line from "./Line";
import { getRandomColor, getViewBox } from "utils";

const Graph: React.FC<{ nodesData: Node[] }> = ({ nodesData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([...nodesData]);
  const [links, setLinks] = useState<
    SimulationLinkDatum<SimulationNodeDatum>[]
  >([]);

  useEffect(() => {
    setIsLoading(true);
    const links: SimulationLinkDatum<SimulationNodeDatum>[] = [];
    nodesData.forEach((node: Node) => {
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
          .distance(10)
      )
      .force("center", forceCenter())
      .force("collide", forceCollide(60));
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
    <>
      {isLoading ? (
        <svg
          className="container"
          height="500"
          width="1000"
          style={{ border: "1px solid #000" }}
        >
          <text textAnchor="middle" x="500" y="250" fontSize="20px">
            Simulating...
          </text>
        </svg>
      ) : (
        nodes[0].x && (
          <svg
            className="container"
            height="500"
            width="1000"
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
                  stroke="#000"
                  opacity="0.7"
                />
              </marker>
            </defs>

            <g>
              {nodes.map((node, idx) => (
                <g key={idx}>
                  {node.type === "center" ? (
                    <Rect {...node} fill="#dce9d5" onChange={handleDragged} />
                  ) : (
                    <Circle
                      {...node}
                      fill={getRandomColor(node.name)}
                      onChange={handleDragged}
                    />
                  )}
                  <text
                    fontSize="12px"
                    textAnchor="start"
                    x={node.x - 30}
                    y={node.y}
                  >
                    {node.type === "center" ? (
                      <>
                        <tspan x={node.x - 30} y={node.y - 7}>
                          Condition:
                        </tspan>
                        <tspan x={node.x - 30} y={node.y + 7}>
                          {node.name}
                        </tspan>
                      </>
                    ) : (
                      <>
                        <tspan x={node.x - node?.size * 0.8} y={node.y - 7}>
                          Node: {node.name}
                        </tspan>
                        <tspan x={node.x - node?.size * 0.8} y={node.y + 7}>
                          Weight: {node.size}
                        </tspan>
                      </>
                    )}
                  </text>
                </g>
              ))}
              {links.map((link, index) => (
                <Line {...link} key={index} />
              ))}
            </g>
          </svg>
        )
      )}
    </>
  );
};

export default Graph;
