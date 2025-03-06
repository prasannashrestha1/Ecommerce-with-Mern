import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSideBarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile toggle */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h1 className="ml-3 text-xl font-medium">Admin Dashboard</h1>
        {/* Overlay for mobile sidebar */}
        {isSideBarOpen && (
          <div
            onClick={toggleSidebar}
            className="w-full h-full fixed bg-black/50 md:hidden "
          ></div>
        )}
        {/* Sidebar */}
      </div>
      <div
        className={`${
          isSideBarOpen
            ? " translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        min-h-screen p-6 w-64  top-0 left-0 fixed md:relative z-50 md:block bg-gray-900  transform transition-transform ease-in-out duration-500
        `}
      >
        <AdminSidebar />
      </div>
      {/* Main Content */}
      <div className="grow p-6 bg-slate-100/50 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
