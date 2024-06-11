"use client";
import CustomSidebar from "@/component/CustomSidebar";
import { Header } from "@/component/Header";
import { useParams } from "next/navigation";


export default function Home() {
  
  return (
   <div className="h-screen overflow-y-hidden">
      <Header />
      <div className="pt-16">
        <CustomSidebar />
      </div>
    </div>
  );
}

