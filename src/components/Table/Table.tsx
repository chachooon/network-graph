import React from "react";
import TableHeadItem from "./TableHeadItem";
import TableRow from "./TableRow";
interface Props {
  theadData: any;
  tbodyData: any;
  customClass?: any;
}
export default function Table({ theadData, tbodyData, customClass }: Props) {
  return (
    <table className={customClass}>
      <thead>
        <tr>
          {theadData.map((h: any) => {
            return <TableHeadItem key={h} item={h} />;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((item: any) => {
          return <TableRow key={item.id} data={item.items} />;
        })}
      </tbody>
    </table>
  );
}
