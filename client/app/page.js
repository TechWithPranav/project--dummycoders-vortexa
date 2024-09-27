"use client"
import Hero from "./_components/Hero";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {

  const [doctorList,setDoctorList]=useState([]);
  useEffect(()=>{
    getDoctorList();
  },[])
  const getDoctorList=()=>{
    GlobalApi.getDoctorList().then(resp=>{
      console.log(resp.data.data);
      setDoctorList(resp.data.data);
    })
  }
  return (
    <div>
        {/* Hero Section  */}
        <Hero/>

        {/* Search bar + Categories  */}
        {/* <CategorySearch/> */}

        {/* Popular Doctor List  */}
        {/* <DoctorList doctorList={doctorList}/> */}
    </div>
  );
}
