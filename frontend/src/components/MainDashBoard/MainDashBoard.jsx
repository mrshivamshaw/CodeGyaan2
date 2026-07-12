import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Sidebar from "./Sidebar";
import Footer from "../Footer/Footer";

const MainDashBoard = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainDashBoard;
