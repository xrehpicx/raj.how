"use client";

import { useEffect } from "react";

import Sdk from "casdoor-js-sdk";
import { casdoorConfig } from "@/conf";



export default function Login() {
  useEffect(()=>{
    const CasdoorSDK = new Sdk(casdoorConfig);
    CasdoorSDK.signin_redirect();
  },[])
  return <></>
}
