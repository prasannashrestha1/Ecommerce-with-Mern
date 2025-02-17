import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="w-full text-center justify-between border-b border-b-stroke">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
