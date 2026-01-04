import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import styled from "styled-components";
import { Paper } from "@mui/material";

const ChartContainer = styled(Paper)`
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default function BudgetPieChart({ used, total }) {
  const remaining = Math.max(0, total - used);

  const data = [
    {
      category: `Used (${Math.round(used)} km)`,
      value: used,
    },
    {
      category: `Remaining (${Math.round(remaining)} km)`,
      value: remaining,
    },
  ];

  return (
    <ChartContainer>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "category" }]}
        yAxis={[{ scaleType: "linear" }]}
        series={[{ dataKey: "value", label: "km" }]}
        width={320}
        height={200}
        margin={{ top: 10, bottom: 60, left: 50, right: 10 }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
    </ChartContainer>
  );
}
