"use client"

import api from "@/lib/axios"
import axios from "axios"

export default function Home() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  console.log(BACKEND_URL)
  function handleClick(){
    window.location.href = `${BACKEND_URL}/auth/github`
  }

  async function handleProtected() {
    await api.get("/auth/me")
  }
  return (  
    <>
      <h1>hey</h1>
      <button
      onClick={handleClick}
      >github</button>

      <button onClick={handleProtected}>protected</button>
    </>
  );
}
  