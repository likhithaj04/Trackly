import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen">
      
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet /> 
      </div>

    </div>
  );
}