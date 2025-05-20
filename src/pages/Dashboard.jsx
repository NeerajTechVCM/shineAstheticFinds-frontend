// pages/AdminDashboard.jsx
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import DashboardHome from "./Dashboardpage";


import UploadProduct from "./UploadproductPage";
import ViewProducts from "./Viewproduct";


export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  const renderPage = () => {
    switch (active) {
      case "upload":
        return <UploadProduct />;
      case "view":
        return <ViewProducts />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 p-4 md:ml-64 mt-16 md:mt-0">{renderPage()}</main>
    </div>
  );
}
