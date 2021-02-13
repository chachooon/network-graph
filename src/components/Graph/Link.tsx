import * as d3 from "d3";

const Link = ({ link }: any) => {
  const path = d3.path();
  path.moveTo(link.source.x + 10, link.source.y + 10);
  path.lineTo(link.target.x + 10, link.target.y + 10);
  // console.log(path);
  return <path stroke="blue" strokeWidth="1" d={path.toString()} />;
};
