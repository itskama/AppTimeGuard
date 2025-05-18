import React from "react";
import { PieChart as MinimalPieChart } from "react-minimal-pie-chart";

export const CustomPieChart: React.FC<{ productive: number; entertainment: number }> = ({ productive, entertainment }) => (
  <MinimalPieChart
    data={[
      { title: "Развлечения", value: entertainment, color: "#FFD700" },
      { title: "Продуктивность", value: productive, color: "#3B82F6" }
    ]}
    radius={40}
    label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
    labelStyle={{ fontSize: "5px" }}
  />
);