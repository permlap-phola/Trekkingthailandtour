import Image from "next/image";
import React from "react";
import Facebook from "../contact-logo/facebook";
import Line from "../contact-logo/line";
import Phone from "../contact-logo/phone";

function Navbar() {
  return (
    <nav className=" top-5 w-full fixed z-40 ">
      <ul className="pl-0 list-none flex justify-between font-Poppins">
        <li className="ml-3 w-max pr-3  gap-2 h-10 bg-main-color rounded-full drop-shadow-md flex justify-between items-center text-third-color">
          <div className="w-10 h-10 rounded-full overflow-hidden relative ring-2 ring-main-color">
            <Image
              src="/logo/logo.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </div>
          <span className="text-xs font-semibold">TREKKING THAILAND TOUR</span>
        </li>
        <li className="mr-2 flex justify-center items-center gap-2">
          <Facebook />
          <Line />
          <Phone />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
