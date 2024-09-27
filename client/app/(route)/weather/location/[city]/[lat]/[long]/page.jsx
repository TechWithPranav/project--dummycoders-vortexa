
// import { getClient } from "@/apollo-client";
// import CalloutCard from "@/app/_components/_weather/CalloutCard";
// import InformationPanel from "@/app/_components/_weather/InformationPanel";
// import StatCard from "@/app/_components/_weather/StatCard";
// import TempChart from "@/app/_components/_weather/TempChart";
// import RainChart from "@/app/_components/_weather/RainChart";
// import HumidityChart from "@/app/_components/_weather/HumidityChart";
// import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
// import cleanData from "@/lib/weather/cleanData";
// import getBasePath from "@/lib/weather/getBasePath";

// export const revalidate = 60;

// async function WeatherPage({ params: { city, lat, long } }) {
//   const client = getClient();

//   const { data } = await client.query({
//     query: fetchWeatherQuery,
//     variables: {
//       current_weather: "true",
//       longitude: long,
//       latitude: lat,
//       timezone: "auto",
//       temperature_unit: "fahrenheit",
//     },
//   });

//   const results = data.myQuery;

//   console.log("Results: ", results);

//   const dataToSend = cleanData(results, city);
//   console.log("dataToSend: ", dataToSend);

//   const res = await fetch(`${getBasePath()}/weather/api/getWeatherSummary`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       weatherData: dataToSend,
//     }),
//   });

//   const GPTData = await res.json();

//   const { textResult } = GPTData;
//   console.log("GPTData: ", GPTData);

//   const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
//   const mphToKmh = (mph) => mph * 1.60934;

//   return (
//     <div className="bg-gray-200 flex flex-col min-h-screen md:flex-row">
//       <InformationPanel city={city} long={long} lat={lat} results={results} />

//       <div className="flex-1 p-5 lg:p-10">
//         <div className="p-5">
//           <div className="pb-5">
//             <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
//             <p className="text-sm text-gray-400">
//               Last Updated at:{" "}
//               {new Date(results.current_weather.time).toLocaleString()} ({results.timezone})
//             </p>
//           </div>

//           <div className="m-2 mb-10">
//             <CalloutCard message={textResult} />
//           </div>

//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
//             <StatCard
//               title="Maximum Temperature"
//               metric={`${fahrenheitToCelsius(
//                 results.daily.temperature_2m_max[0]
//               ).toFixed(1)}°C`}
//               color="yellow"
//             />
//             <StatCard
//               title="Minimum Temperature"
//               metric={`${fahrenheitToCelsius(
//                 results.daily.temperature_2m_min[0]
//               ).toFixed(1)}°C`}
//               color="green"
//             />

//             <div>
//               <StatCard
//                 title="UV Index"
//                 metric={`${results.daily.uv_index_max[0].toFixed(1)}°`}
//                 color="rose"
//               />
//               {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
//                 <CalloutCard message="The UV is high today, be sure to wear sunscreen!" warning />
//               )}
//             </div>

//             <div className="flex space-x-3">
//               <StatCard
//                 title="Wind Speed"
//                 metric={`${mphToKmh(results.current_weather.windspeed).toFixed(1)} km/h`}
//                 color="cyan"
//               />

//               <StatCard
//                 title="Wind Direction"
//                 metric={`${results.current_weather.winddirection.toFixed(1)}°`}
//                 color="violet"
//               />
//             </div>
//           </div>
//         </div>
//         <hr className="mb-5" />
//         <div>
//           <TempChart results={results} />
//           <RainChart results={results} />
//           <HumidityChart results={results} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WeatherPage;


// ********************************************************************************************************************************************************************************


// import { getClient } from "@/apollo-client";
// import CalloutCard from "@/app/_components/_weather/CalloutCard";
// import InformationPanel from "@/app/_components/_weather/InformationPanel";
// import StatCard from "@/app/_components/_weather/StatCard";
// import TempChart from "@/app/_components/_weather/TempChart";
// import RainChart from "@/app/_components/_weather/RainChart";
// import HumidityChart from "@/app/_components/_weather/HumidityChart";
// import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
// import cleanData from "@/lib/weather/cleanData";
// import getBasePath from "@/lib/weather/getBasePath";

// export const revalidate = 60;

// async function WeatherPage({ params: { city, lat, long } }) {
//   const client = getClient();

//   const { data } = await client.query({
//     query: fetchWeatherQuery,
//     variables: {
//       current_weather: "true",
//       longitude: long,
//       latitude: lat,
//       timezone: "auto",
//       temperature_unit: "fahrenheit",
//     },
//   });

//   const results = data.myQuery;

//   console.log("Results: ", results);

//   const dataToSend = cleanData(results, city);
//   console.log("dataToSend: ", dataToSend);

//   const res = await fetch(`${getBasePath()}/weather/api/getWeatherSummary`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       weatherData: dataToSend,
//     }),
//   });

//   let GPTData;
//   if (res.ok) {
//     try {
//       GPTData = await res.json();

//       console.log("GPTData data: ", GPTData);
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       GPTData = { textResult: "No data available" };
//     }
//   } else {
//     console.error("Fetch error:", res.statusText);
//     GPTData = { textResult: "No data available" };
//   }

//   const { textResult } = GPTData;
//   console.log("GPTData: ", GPTData);

//   const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
//   const mphToKmh = (mph) => mph * 1.60934;

//   return (
//     <div className="bg-gray-200 flex flex-col min-h-screen md:flex-row">
//       <InformationPanel city={city} long={long} lat={lat} results={results} />

//       <div className="flex-1 p-5 lg:p-10">
//         <div className="p-5">
//           <div className="pb-5">
//             <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
//             <p className="text-sm text-gray-400">
//               Last Updated at:{" "}
//               {new Date(results.current_weather.time).toLocaleString()} ({results.timezone})
//             </p>
//           </div>

//           <div className="m-2 mb-10">
//             <CalloutCard message={textResult} />
//           </div>

//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
//             <StatCard
//               title="Maximum Temperature"
//               metric={`${fahrenheitToCelsius(
//                 results.daily.temperature_2m_max[0]
//               ).toFixed(1)}°C`}
//               color="yellow"
//             />
//             <StatCard
//               title="Minimum Temperature"
//               metric={`${fahrenheitToCelsius(
//                 results.daily.temperature_2m_min[0]
//               ).toFixed(1)}°C`}
//               color="green"
//             />

//             <div>
//               <StatCard
//                 title="UV Index"
//                 metric={`${results.daily.uv_index_max[0].toFixed(1)}°`}
//                 color="rose"
//               />
//               {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
//                 <CalloutCard message="The UV is high today, be sure to wear sunscreen!" warning />
//               )}
//             </div>

//             <div className="flex space-x-3">
//               <StatCard
//                 title="Wind Speed"
//                 metric={`${mphToKmh(results.current_weather.windspeed).toFixed(1)} km/h`}
//                 color="cyan"
//               />

//               <StatCard
//                 title="Wind Direction"
//                 metric={`${results.current_weather.winddirection.toFixed(1)}°`}
//                 color="violet"
//               />
//             </div>
//           </div>
//         </div>
//         <hr className="mb-5" />
//         <div>
//           <TempChart results={results} />
//           <RainChart results={results} />
//           <HumidityChart results={results} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WeatherPage;



// ********************************************************************************************************************************************************************************


import { getClient } from "@/apollo-client";
import CalloutCard from "@/app/_components/_weather/CalloutCard";
import InformationPanel from "@/app/_components/_weather/InformationPanel";
import StatCard from "@/app/_components/_weather/StatCard";
import TempChart from "@/app/_components/_weather/TempChart";
import RainChart from "@/app/_components/_weather/RainChart";
import HumidityChart from "@/app/_components/_weather/HumidityChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/weather/cleanData";
import getBasePath from "@/lib/weather/getBasePath";
import twilio from "twilio";

export const revalidate = 60;

async function sendWhatsAppNotification(message) {
  const accountSid = 'AC9ba8094e234bccaa4dcdada512fa2f95'; // Your Twilio Account SID
  const authToken = 'e6f635c8bab1eda2747ff1db01310d81'; // Your Twilio Auth Token
  const client = twilio(accountSid, authToken);

  try {
    const response = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
      to: 'whatsapp:+919325831799'   // The user's WhatsApp number
    });
    console.log('WhatsApp message sent:', response.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}

async function WeatherPage({ params: { city, lat, long } }) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "auto",
      temperature_unit: "fahrenheit",
    },
  });

  const results = data.myQuery;

  console.log("Results: ", results);

  const dataToSend = cleanData(results, city);
  console.log("dataToSend: ", dataToSend);

  const res = await fetch(`${getBasePath()}/weather/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weatherData: dataToSend,
    }),
  });

  let GPTData;
  if (res.ok) {
    try {
      GPTData = await res.json();
      console.log("GPTData data: ", GPTData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      GPTData = { textResult: "No data available" };
    }
  } else {
    console.error("Fetch error:", res.statusText);
    GPTData = { textResult: "No data available" };
  }

  const { textResult } = GPTData;
  console.log("GPTData: ", GPTData);

  const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
  const mphToKmh = (mph) => mph * 1.60934;

  const uvIndex = Number(results.daily.uv_index_max[0].toFixed(1));

  // Send WhatsApp notification if UV index exceeds 5
  if (uvIndex > 5) {
    const message = `Warning: The UV index is high today (${uvIndex}), be sure to wear sunscreen!`;
    await sendWhatsAppNotification(message);
  }

  return (
    <div className="bg-gray-200 flex flex-col min-h-screen md:flex-row">
      <InformationPanel city={city} long={long} lat={lat} results={results} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString()} ({results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message={textResult} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${fahrenheitToCelsius(
                results.daily.temperature_2m_max[0]
              ).toFixed(1)}°C`}
              color="yellow"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${fahrenheitToCelsius(
                results.daily.temperature_2m_min[0]
              ).toFixed(1)}°C`}
              color="green"
            />

            <div>
              <StatCard
                title="UV Index"
                metric={`${uvIndex}°`}
                color="rose"
              />
              {uvIndex > 5 && (
                <CalloutCard message="The UV is high today, be sure to wear sunscreen!" warning />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${mphToKmh(results.current_weather.windspeed).toFixed(1)} km/h`}
                color="cyan"
              />

              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5" />
        <div>
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
