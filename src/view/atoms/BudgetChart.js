import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import styled from "styled-components";
import { Paper } from "@mui/material";

const ChartContainer = styled(Paper)`
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Fira Mono", monospace;

  @media (max-width: 320px) {
    padding: 5px;
    max-width: 25%;
  }
`;

export default function BudgetChart({ used, total }) {
  const remaining = Math.max(0, total - used);

  const data = [
    {
      category: "Travel Budget",
      used: used,
      remaining: remaining,
    },
  ];

  return (
    <ChartContainer>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "category" }]}
        series={[
          {
            dataKey: "used",
            label: `Used (${Math.round(used)} km)`,
            stack: "A",
            color: "#ef5350",
          },
          {
            dataKey: "remaining",
            label: `Remaining (${Math.round(remaining)} km)`,
            stack: "A",
            color: "#66bb6a",
          },
        ]}
        width={120}
        height={140}
        margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
        slotProps={{
          legend: {
            hidden: true,
            position: { vertical: "bottom", horizontal: "middle" },
          },
        }}
      />
    </ChartContainer>
  );
}
