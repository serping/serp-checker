"use client"
import { SerpForm } from "@/frontend/home/form";
// import apiClient from "@/lib/api";
import { type HomeFormValues } from "@/shema/index";

export function Main() {
  // const client = apiClient.get('/location', { params: { q:  }})
  const onSubmit =(values: HomeFormValues)=>{
    console.log("values", values)
  }
  return (
    <div>
      <SerpForm onSubmit={onSubmit} />
      <div className="container">
        Home
      </div>
    </div>
  );
}
