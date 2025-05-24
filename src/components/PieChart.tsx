import React from "react";
import { PieChart as MinimalPieChart } from "react-minimal-pie-chart";

export const CustomPieChart: React.FC<{ data: { title: string; value: number; color: string }[]; radius?: number }> = ({ data, radius = 50 }) => (
  <MinimalPieChart
    data={data}
    radius={radius}
    label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
    labelStyle={{ fontSize: "6px" }} // Уменьшен размер текста меток
  />
);