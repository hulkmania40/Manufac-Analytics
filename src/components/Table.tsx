import React, { FC } from "react";
import "./Table.css";

type TableProps = {
  title: string;
  data: TableData[];
};

interface TableData {
  alcohol_class: number;
  mean: number;
  median: number;
  mode: number;
}

const Table: FC<TableProps> = ({ title, data }) => {
  return (
    <>
      <table className="table-container">
        <thead>
          <tr>
            <th>Measure</th>
            {data.map((res, index) => {
              return <th key={`header_${index}`}>Class {res.alcohol_class}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{title} Mean</td>
            {data.map((res, index) => (
              <td key={`mean_${index}`}>{res.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{title} Median</td>
            {data.map((res, index) => (
              <td key={`median_${index}`}>{res.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{title} Mean</td>
            {data.map((res, index) => (
              <td key={`mode_${index}`}>{res.mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <hr />
    </>
  );
};

export default Table;
