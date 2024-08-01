import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Adjust the key name as necessary
    if (!token) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  const handleMembership = () => {
    navigate("/membership");
  };

  return (
    <div>
      <Navbar />
      <div className="z-0 overflow-x-hidden bg-slate-900 h-screen relative pt-40 pb-20 lg:pt-44">
        <div className="relative xl:container m-auto px-6 md:px-12 lg:px-6">
          <div className="w-10 h-10 bg-transparent border-4 border-blue-600 animate-spin1"></div>
          <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-extrabold text-white text-4xl text-center sm:text-5xl md:text-6xl lg:w-auto lg:text-left xl:text-7xl dark:text-white">
            The Indian Chamber of Commerce and Industry
            <br className="lg:block hidden" />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              Branding Coimbatore is our business
            </span>
            .
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
