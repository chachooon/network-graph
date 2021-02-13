import React, { useState, useEffect } from "react";
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
      });
    // .on("end", () => console.log("simulation end"));

    // function dragstarted(d) {
    //   if (!d3.event.active) simulation.alphaTarget(0.3).restart(); //sets the current target alpha to the specified number in the range [0,1].
    //   d.fy = d.y; //fx - the node’s fixed x-position. Original is null.
    //   d.fx = d.x; //fy - the node’s fixed y-position. Original is null.
    // }

    // //When the drag gesture starts, the targeted node is fixed to the pointer
    // function dragged(d) {
    //   d.fx = d3.event.x;
    //   d.fy = d3.event.y;
    // }

    // //the targeted node is released when the gesture ends
    // function dragended(d) {
    //   if (!d3.event.active) simulation.alphaTarget(0);
    //   d.fx = null;
    //   d.fy = null;

    //   console.log("dataset after dragged is ...", dataset);
    // }
    return () => {
      simulation.stop();
    };
  }, []);

  function _nodeDependedOn(node: any) {
    let dependedOn = false;

    nodes.forEach((n) => {
      dependedOn = dependedOn || n.dependsOn.includes(node.id);
    });

    return dependedOn;
  }

  function _getMaxPath() {
    const terminations: any[] = [];
    nodes.forEach((node) => {
      if (!_nodeDependedOn(node)) {
        terminations.push(node);
      }
    });

    return Math.max(...terminations.map((node) => _calcPath(node)));
  }

  /**
   * Recursively calculates the **longest** path in our tree
   */
  function _calcPath(node: any, length = 1) {
    // end case
    if (!node.dependsOn || node.dependsOn.length < 1) {
      return length;
    }

    return Math.max(
      ...node.dependsOn.map((id: any) =>
        _calcPath(
          nodes.find((n) => n.id === id),
          length + 1
        )
      )
    );
  }

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

      {/* Our visualization should go here. */}
      <g>
        {nodes.map((node, idx) => (
          <g key={idx}>
            {node.type === "rect" ? <Rect {...node} /> : <Circle {...node} />}
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
