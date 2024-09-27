"use client"

import Mediscan from "@/app/_components/Mediscan";
import GlobalApi from "@/app/_utils/GlobalApi";
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
      <Mediscan />
    </div>
  );
}
