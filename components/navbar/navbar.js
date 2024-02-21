import Image from "next/image";
import React, { useState } from "react";
import Facebook from "../contact-logo/facebook";
import Line from "../contact-logo/line";
import Phone from "../contact-logo/phone";
import { useRouter } from "next/router";
import { BiSolidUser } from "react-icons/bi";
import AuthButton from "../auth/auth-button";
import { MdAdminPanelSettings } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { GetUser } from "@/services/user";
import Link from "next/link";

function Navbar() {
  const [activeMenu, setActivemenu] = useState(false);
  const router = useRouter();
  const user = useQuery(["user"], () => GetUser());
  const handleTriggerMenu = () => {
    document.body.style.overflow = "auto";
    setActivemenu(() => !activeMenu);
  };
  return (
    <nav className="  w-full sticky z-[60] top-0 font-Poppins    ">
      {/* Phone navbar */}
      <ul className="pl-0 py-5 md:hidden list-none flex justify-between font-Poppins z-20 ">
        <li
          role="button"
          onClick={handleTriggerMenu}
          className={`ml-3 w-56 pr-3  gap-2 h-10 ring-2  ${
            activeMenu
              ? "bg-supper-main-color ring-white flex-row-reverse z-20"
              : "bg-main-color ring-main-color flex-row "
          }
         rounded-full overflow-hidden drop-shadow-md relative flex justify-between items-center text-third-color`}
        >
          <div
            className={`${
              activeMenu
                ? "translate-x-3 ring-white "
                : "translate-x-0 ring-main-color "
            } transition duration-150 w-10 h-10 rounded-full overflow-hidden relative  ring-2 `}
          >
            <Image
              src="/logo/logo.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </div>
          {activeMenu ? (
            <span className="text-xs ml-10 font-semibold">CLOSE MENU</span>
          ) : (
            <span className="text-xs font-semibold">
              TREKKING THAILAND TOUR
            </span>
          )}
        </li>
        <li className="mr-2 flex justify-center items-center gap-2">
          <a
            target="_blank"
            href="https://www.facebook.com/trekkingthailandtour"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
          {/* <Line />
          <Phone /> */}
        </li>
      </ul>
      <div
        className={`bg-supper-main-color md:hidden gap-10 flex justify-center flex-col items-center w-full h-screen transition duration-150 fixed top-0 ${
          activeMenu ? "translate-y-0" : "-translate-y-[60rem]"
        } `}
      >
        <div>
          <AuthButton />
        </div>
        <Link
          href={`/`}
          onClick={() => {
            setActivemenu(() => false);
          }}
          className=" bg-white px-10 py-2 active:ring-main-color active:ring-2
         font-medium text-main-color rounded-md drop-shadow-md"
        >
          Homepage
        </Link>
        <Link
          href={`/package`}
          onClick={() => {
            setActivemenu(() => false);
          }}
          className=" bg-white px-10 py-2 active:ring-main-color active:ring-2
         font-medium text-main-color rounded-md drop-shadow-md"
        >
          Package
        </Link>
        {user?.data?.role === "admin" && (
          <Link
            href={`/admin`}
            className={`  ${
              router.route === "/admin" ? "bg-supper-main-color" : "bg-white"
            } lg:px-10 md:px-5 hover:ring-2  py-2 ring-main-color px-2 flex items-center justify-center  font font-semibold active:ring-main-color active:ring-4
          text-main-color rounded-md drop-shadow-md`}
          >
            <div className="flex items-center justify-center text-2xl">
              <MdAdminPanelSettings />
            </div>
            Admin
          </Link>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex items-center bg-third-color/25 backdrop-blur-sm py-5 justify-center gap-10 pl-0 list-none ">
        <Link
          href={"/"}
          className={`ml-3 w-56 pr-3   gap-2 h-10 ring-2 hover:bg-supper-main-color bg-main-color ring-main-color flex-row
         rounded-full overflow-hidden drop-shadow-md relative flex justify-between items-center text-third-color`}
        >
          <div
            className={`
             translate-x-0 ring-main-color  
            transition duration-150 w-10 h-10 rounded-full overflow-hidden relative  ring-2 `}
          >
            <Image
              src="/logo/logo.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </div>

          <span className="text-xs font-semibold">TREKKING THAILAND TOUR</span>
        </Link>
        <ul className="pl-0 mr-10 flex gap-10">
          <Link
            href={`/package`}
            className={`  ${
              router.route === "/package" ? "bg-supper-main-color" : "bg-white"
            } lg:px-10 md:px-5 hover:ring-2 py-2 ring-main-color flex items-center justify-center  font font-semibold active:ring-main-color active:ring-4
          text-main-color rounded-md drop-shadow-md`}
          >
            Package
          </Link>

          <li>
            <AuthButton />
          </li>
          {user?.data?.role === "admin" && (
            <Link
              href={"/admin"}
              className={`  ${
                router.route === "/admin" ? "bg-supper-main-color" : "bg-white"
              } lg:px-10 md:px-5 hover:ring-2  py-2 ring-main-color flex items-center justify-center  font font-semibold active:ring-main-color active:ring-4
          text-main-color rounded-md drop-shadow-md`}
            >
              <div className="flex items-center justify-center text-2xl">
                <MdAdminPanelSettings />
              </div>
              Admin
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
