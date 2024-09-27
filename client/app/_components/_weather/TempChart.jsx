// "use client";

// import { Card, AreaChart, Title } from "@tremor/react";

// function TempChart({ results }) {
//   const hourly = results?.hourly.time
//     .map((time) =>
//       new Date(time).toLocaleString("en-US", {
//         hour: "numeric",
//         hour12: false,
//       })
//     )
//     .slice(1, 24);

//   const data = hourly.map((hour, i) => ({
//     time: Number(hour),
//     "UV Index": results.hourly.uv_index[i],
//     "Temperature (C)": ((results.hourly.temperature_2m[i] - 32) * (5 / 9)).toFixed(1),
//   }));

//   const dataFormatter = (number) => `${number}°C`;

//   return (
//     <Card>
//       <Title>Temperature & UV Index</Title>
//       <AreaChart
//         className="mt-6"
//         data={data}
//         showLegend
//         index="time"
//         categories={["Temperature (C)", "UV Index"]}
//         colors={["yellow", "rose"]}
//         minValue={0}
//         valueFormatter={dataFormatter}
//         yAxisWidth={40}
//       />
//     </Card>
//   );
// }

// export default TempChart;


"use client";

import { Card, AreaChart, Title } from "@tremor/react";

function TempChart({ results }) {
  const hourly = results?.hourly?.time
    ?.map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(1, 24) || [];

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "UV Index": results?.hourly?.uv_index?.[i] || 0,
    "Temperature (C)": results?.hourly?.temperature_2m?.[i]
      ? ((results.hourly.temperature_2m[i] - 32) * (5 / 9)).toFixed(1)
      : "N/A",
  }));

  const dataFormatter = (number) => (number !== "N/A" ? `${number}°C` : "N/A");

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature (C)", "UV Index"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default TempChart;
