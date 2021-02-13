import { useState, useEffect } from "react";
import * as d3 from "d3";

interface Node {
  id: number;
  data: NodeData;
}
interface NodeData {
  type: string;
}

interface Props {
  nodes: Array<any>;
  links: Array<any>;
}
export default function useSimulation(props: Props) {
  const [nodes, setNodes] = useState([...props.nodes]);
  const [links, setLinks] = useState([...props.links]);

  useEffect((): any => {
    const mutableNodes = [...props.nodes];
    const mutableLinks = [...props.links];

    const simulation = d3
      .forceSimulation(mutableNodes)
      .force(
        "link",
        d3
          .forceLink(mutableLinks)
          .id((data: any) => data.id)
          .distance(50)
      )
      .force("charge", d3.forceManyBody().strength(-60));

    simulation.on("tick", () => {
      const k = 6 * simulation.alpha();
      mutableLinks.forEach((link) => {
        link.source.y -= k;
        link.target.y += k;
      });

      setNodes([...mutableNodes]);
      setLinks([...mutableLinks]);
    });
    return () => simulation.stop();
  }, [props]);

  return [nodes, links];
}
