// "use client";

// import { Card, AreaChart, Title } from "@tremor/react";

// function RainChart({ results }) {
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
//     "Rain (%)": results.hourly.precipitation_probability[i],
//   }));

//   const dataFormatter = (number) => `${number} %`;

//   return (
//     <Card>
//       <Title>Chances of Rain</Title>
//       <AreaChart
//         className="mt-6"
//         data={data}
//         showLegend
//         index="time"
//         categories={["Rain (%)"]}
//         colors={["blue"]}
//         maxValue={100}
//         minValue={0}
//         valueFormatter={dataFormatter}
//         yAxisWidth={40}
//       />
//     </Card>
//   );
// }

// export default RainChart;


"use client";

import { Card, AreaChart, Title } from "@tremor/react";

function RainChart({ results }) {
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
    "Rain (%)": results?.hourly?.precipitation_probability?.[i] || 0,
  }));

  const dataFormatter = (number) => `${number} %`;

  return (
    <Card>
      <Title>Chances of Rain</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Rain (%)"]}
        colors={["blue"]}
        maxValue={100}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default RainChart;
