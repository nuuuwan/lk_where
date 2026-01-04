import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import styled from "styled-components";
import { Box, Typography, Paper } from "@mui/material";

const ChartContainer = styled(Paper)`
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Typography)`
  margin-bottom: 16px;
  font-weight: 600;
  color: #333;
`;

const StatsContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
`;

const StatItem = styled(Box)`
  text-align: center;
`;

const StatLabel = styled(Typography)`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
`;

const StatValue = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

export default function BudgetPieChart({ used, total }) {
  const remaining = Math.max(0, total - used);

  const data = [
    { label: "Used", value: used, id: 0 },
    { label: "Remaining", value: remaining, id: 1 },
  ];

  const usedPercentage = total > 0 ? ((used / total) * 100).toFixed(1) : 0;
  const remainingPercentage =
    total > 0 ? ((remaining / total) * 100).toFixed(1) : 0;

  return (
    <ChartContainer>
      <Title variant="h6">Travel Budget</Title>
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { additionalRadius: -30, color: "gray" },
            valueFormatter: (value) => `${Math.round(value)} km`,
            arcLabel: (item) => `${Math.round(item.value)} km`,
            arcLabelMinAngle: 35,
          },
        ]}
        width={300}
        height={250}
        margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
        slotProps={{
          legend: {
            hidden: false,
            position: { vertical: "bottom", horizontal: "middle" },
          },
        }}
        colors={["#ff7043", "#66bb6a"]}
      />
      <StatsContainer>
        <StatItem>
          <StatLabel>Used</StatLabel>
          <StatValue>{used} km</StatValue>
          <StatLabel>({usedPercentage}%)</StatLabel>
        </StatItem>
        <StatItem>
          <StatLabel>Remaining</StatLabel>
          <StatValue>{remaining} km</StatValue>
          <StatLabel>({remainingPercentage}%)</StatLabel>
        </StatItem>
        <StatItem>
          <StatLabel>Total</StatLabel>
          <StatValue>{total} km</StatValue>
        </StatItem>
      </StatsContainer>
    </ChartContainer>
  );
}
