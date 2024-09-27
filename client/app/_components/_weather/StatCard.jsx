import { Card, Color, Metric, Text, Title } from "@tremor/react";

function StatCard({ title, metric, color }) {
  return (
    <Card decoration="top" decorationColor={color}>
      <Title>{title}</Title>
      <Metric>{metric}</Metric>
    </Card>
  );
}

export default StatCard;
