import { MoonIcon, SunIcon } from "@heroicons/react/solid";

function InformationPanel({ city, lat, long, results }) {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] text-white p-5">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">{decodeURIComponent(city)}</h1>
        <p className="text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <hr className="my-10" />

      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">Timezone: {results.timezone}</p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>

      <hr className="mt-10 mb-5" />

      <div>
        <div className="flex items-center justify-between">
          <p className="font-light">Sunrise</p>
          <p className="uppercase">{results.daily.sunrise[0].split("T")[1]}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-light">Sunset</p>
          <p className="uppercase">{results.daily.sunset[0].split("T")[1]}</p>
        </div>
        <div className="flex items-center justify-between mt-10">
          <p className="font-light">Wind Speed</p>
          <p className="uppercase">{results.current_weather.windspeed.toFixed(1)} km/h</p>
        </div>
        <div className="flex items-center justify-between mt-10">
          <p className="font-light">Wind Direction</p>
          <p className="uppercase">{results.current_weather.winddirection.toFixed(1)}°</p>
        </div>
      </div>

      <hr className="mt-10 mb-5" />

      <div className="mt-5 flex flex-col space-y-2">
        <div className="flex items-center space-x-2 px-4 py-3 border rounded-md border-[#6A6A6A] bg-[#616161]">
          <SunIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Maximum Temperature</p>
            <p className="text-2xl">
              {((results.daily.temperature_2m_max[0] - 32) * (5 / 9)).toFixed(1)}°C
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border rounded-md border-[#6A6A6A] bg-[#616161]">
          <MoonIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Minimum Temperature</p>
            <p className="text-2xl">
              {((results.daily.temperature_2m_min[0] - 32) * (5 / 9)).toFixed(1)}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
