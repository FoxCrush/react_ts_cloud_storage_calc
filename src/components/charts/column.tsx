import React from "react";
import { Chart } from "react-google-charts";
import { IPrices } from "../../interfaces/calc-interfaces";

export default function ColumnChart({ data: brandsData }) {
  const { allPrices, bestPrice }: { allPrices: IPrices[]; bestPrice: number } =
    brandsData;
  console.log("brands", allPrices, bestPrice);

  const data = [
    ["", "", { role: "style" }],
    ["Copper", 8.94, "silver"],
    ["Silver", 10.49, "silver"],
    ["Gold", 19.3, "silver"],
  ];

  const options = {
    legend: { position: "none" },
    vAxis: {
      gridlines: {
        interval: 0,
      },
    },
    hAxis: {
      gridlines: {
        interval: 0,
      },
    },
  };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
