import React from "react";

const Footer = () => {
  const time = new Date();
  const year = time.getFullYear();

  return (
    <footer className="absolute flex justify-center items-center bottom-0 left-0 h-[2rem] w-full bg-[#232120]">
      <p className="text-[10px] text-[#f05123]">SMI Engineering {year}</p>
    </footer>
  );
};

export default Footer;
