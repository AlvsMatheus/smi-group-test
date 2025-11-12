import React from "react";
import { FaBars } from "react-icons/fa";
import logo from "/public/images/smi-logo.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="absolute flex justify-between items-center px-4 top-0 left-0 w-full h-[4rem] bg-[#232120]">
      <div className="flex justify-center items-center gap-2">
        <FaBars size={25} className="text-[#f05123]" />
        <Image src={logo} alt="smi logo" width={140} height={50} />
      </div>
      <div className="flex justify-center items-center rounded-full h-[2rem] w-[2rem] bg-[#f05123]">
        <span>LM</span>
      </div>
    </nav>
  );
};

export default Navbar;
