"use client"
import Hero from "@/app/_components/Hero";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import UserProfile from "@/app/_components/ShowProfile";

export default function Home() {

  return (
    <div>
        {/* Hero Section  */}
        {/* <Hero/> */}

        {/* Search bar + Categories  */}
        {/* <CategorySearch/> */}

        {/* Popular Doctor List  */}
        {/* <DoctorList doctorList={doctorList}/> */}
        <UserProfile/>
    </div>
  );
}
