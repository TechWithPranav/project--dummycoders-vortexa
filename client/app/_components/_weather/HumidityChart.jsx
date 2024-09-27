"use client";

import { Card, AreaChart, Title } from "@tremor/react";

function HumidityChart({ results }) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(1, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Humidity (%)": results.hourly.relativehumidity_2m[i],
  }));

  const dataFormatter = (number) => `${number} %`;

  return (
    <Card>
      <Title>Humidity Levels</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Humidity (%)"]}
        colors={["teal"]}
        maxValue={100}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default HumidityChart;
