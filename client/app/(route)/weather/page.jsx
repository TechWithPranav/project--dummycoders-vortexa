"use client";

import CitySelector from "@/app/_components/_weather/CitySelector";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394f68] to-[#183B7E] p-10 flex flex-col justify-center items-center">
        <Text className="text-5xl font-bold text-center mb-10">
          🌦️ Weather.AI ☁️
        </Text>
        <CitySelector />
    </div>
  );
}
