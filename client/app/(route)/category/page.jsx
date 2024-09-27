"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CategorySearch from "@/app/_components/CategorySearch";
import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Doctors() {

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
        {/* Search bar + Categories  */}
        <CategorySearch/>

        {/* Popular Doctor List  */}
        {/* <DoctorList doctorList={doctorList}/> */}
    </div>
  );
}
