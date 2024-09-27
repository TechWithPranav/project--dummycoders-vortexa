"use client"
import Hero from "@/app/_components/Hero";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import Onboarding from "@/app/_components/fill_profile";
import { StateContextProvider } from "@/app/_context";

export default function Home() {

  return (
    <div>
        <Onboarding/>
    </div>
  );
}
