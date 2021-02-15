import { InputData } from "model";
import Input from "./Input";

interface Props {
  theadData: string[];
  tbodyData: InputData[];
  onChange: Function;
  onDelete: Function;
}

export default function Table({
  theadData,
  tbodyData,
  onChange,
  onDelete,
}: Props) {
  return (
    <table>
      <thead>
        <tr>
          {theadData.map((item: string) => {
            return <th key={item}>{item}</th>;
          })}
          <th key="del">삭제</th>
        </tr>
      </thead>
      <tbody>
        {tbodyData.length > 0 &&
          tbodyData.map((item: InputData, idx: number) => {
            return (
              <tr key={idx}>
                <td key="L_Node">
                  <Input
                    value={item.left.name}
                    onChange={(e) => {
                      onChange(idx, "L_Node", e.target.value);
                    }}
                  />
                </td>
                <td key="L_Weight">
                  <Input
                    type="number"
                    value={item.left.size}
                    onChange={(e) => {
                      onChange(idx, "L_Weight", e.target.value);
                    }}
                  />
                </td>
                <td key="R_Node">
                  <Input
                    value={item.right.name}
                    onChange={(e) => {
                      onChange(idx, "R_Node", e.target.value);
                    }}
                  />
                </td>
                <td key="R_Weight">
                  <Input
                    type="number"
                    value={item.right.size}
                    onChange={(e) => {
                      onChange(idx, "R_Weight", e.target.value);
                    }}
                  />
                </td>
                <td key="Condition">
                  <Input
                    value={item.center.name}
                    onChange={(e) => {
                      onChange(idx, "Condition", e.target.value);
                    }}
                  />
                </td>
                <td key="F_Node">
                  <Input
                    value={item.bottom.name}
                    onChange={(e) => {
                      onChange(idx, "F_Node", e.target.value);
                    }}
                  />
                </td>
                <td key="F_Weight">
                  <Input
                    type="number"
                    value={item.bottom.size}
                    onChange={(e) => {
                      onChange(idx, "F_Weight", e.target.value);
                    }}
                  />
                </td>
                <td key="del">
                  <button
                    onClick={() => {
                      onDelete(idx);
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
