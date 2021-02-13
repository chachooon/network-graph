import React, { useState, useEffect } from "react";
import {
  forceSimulation,
  forceLink,
  forceCollide,
  forceX,
  forceY,
  forceManyBody,
} from "d3-force";

interface Props {
  radius: number;

  nodes: Array<any>;
}

interface Link {
  source: any;
  target: any;
}

export default function Graph(props: Props) {
  const [nodes, setNodes] = useState<Array<any>>(props.nodes);
  const [links, setLinks] = useState<Array<Link>>([]);
  const [height, setHeight] = useState<number>(_getMaxPath() * 150 + 100);

  useEffect(() => {
    const tempLinks: Array<Link> = [];
    nodes.forEach((node) => {
      if (!node.dependsOn) return;

      node.dependsOn.forEach((index: number) => {
        tempLinks.push({ source: index, target: node.id });
      });
    });
    setLinks(tempLinks);
    setHeight(_getMaxPath() * 150 + 100);

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink()
          .id((d: any) => d.id)
          .links(links)
          .distance(100)
          .strength(0.9)
      )
      .force("x", forceX(300).strength(0.1))
      .force("charge", forceManyBody().strength(-1500))
      .force(
        "y",
        forceY()
          .y((node) => {
            // let dependedOn = this._nodeDependedOn(node);

            // if (!dependedOn) {

            return _calcPath(node) * 150 - 75;
            // }

            // return node.dependsOn.length < 1 ? 100 : 0;
          })
          .strength((node) => {
            let dependedOn = _nodeDependedOn(node);

            // if (!dependedOn || node.dependsOn.length < 1) {
            return 3;
            // }

            // not a top or bottom
            // return 0;
          })
      )
      .force("collide", forceCollide(props.radius))
      .on("tick", () => {
        setNodes(nodes);
        setLinks(links);
      })
      .on("end", () => console.log("simulation end"));

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
    <svg className="container" height={height} width="100%">
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
        {nodes.map((n, idx) => (
          <g key={idx}>
            <circle
              cx={n.x}
              cy={n.y}
              r={props.radius}
              fill="#FFF"
              stroke="#000"
            />
            <text textAnchor="middle" x={n.x} y={n.y}>
              {n.name}
            </text>
          </g>
        ))}
        {links.map((link, index) => {
          console.log("link", link);
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
