import styled from "styled-components";

export const Button = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  margin-right: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  display: inline-block;
`;

export const StatLabel = styled.p`
  margin: 0;
  font-size: 10px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StatValue = styled.p`
  margin: 4px 0 0 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;
