import React from "react";
import ManagerSection from "../components/ManagerSection";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Hero = () => {
  return (
    <main className="relative flex justify-center items-center min-h-screen w-full bg-[#f1f3f4] bg-center">
      <Navbar />
      <ManagerSection />
      <Footer />
    </main>
  );
};

export default Hero;
