import React, { useState } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ArrowBigDown, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/signin";
  };

  const renderDropdownLinks = () => {
    const userRole = token ? jwtDecode(token).role : null;
    if (userRole === "admin") {
      return (
        <>
          <a
            href="/admin-dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Admin Dashboard
          </a>
          
        </>
      );
    } else if (userRole === "seller") {
      return (
        <>
          <a
            href="/seller-dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Seller Dashboard
          </a>
          
        </>
      );
    } 
  };

  return (
    <div className="flex items-center justify-between px-16 h-auto z-50 top-0  gap-5  fixed  w-screen bg-white text-black font-bold">
      <div>
        <img
          src="/favicon.ico"
          alt="Poomas Buy and sell anything online in UAE"
          className="w-32 h-32"
        />
      </div>
      <div className="relative">
        <span className="cursor-pointer" onClick={handleDropdownToggle}>
           {token ? `Welcome, ${jwtDecode(token).username}` : 
          (
            <div className="flex gap-1 ">
              <a href="/signin" className="text-blue-500">
                Sign In
              </a>
              <a href="/user/signup" className="text-blue-500">
                Sign Up
              </a>
            </div>
          )
          }{" "}
         
          
        </span>
        {dropdownOpen && (
          <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
            <div className="py-1">
              {renderDropdownLinks()}
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
