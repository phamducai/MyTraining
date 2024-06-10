"use client";

import HeaderAdmin from "@/component/HeaderAdmin";
import { SidebarAdmin } from "@/component/SideBarAdmin";

export default function admin() {

return (
    <div className="h-screen overflow-y-hidden">
    <HeaderAdmin />
    <div className="pt-16">
      <SidebarAdmin />
    </div>
  </div>
)
}