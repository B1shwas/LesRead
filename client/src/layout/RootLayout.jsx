import React from "react";
import Navbar from "../views/Navbar";
import { useLocation } from "react-router-dom";

const RootLayout = ({ children }) => {
  const location = useLocation();

  const shouldRenderNavbar = () => {
    const pathnames = ["/login", "/register"];
    return !pathnames.includes(location.pathname);
  };
  return (
    <div>
      {shouldRenderNavbar() && <Navbar />}
      {children}
    </div>
  );
};

export default RootLayout;
