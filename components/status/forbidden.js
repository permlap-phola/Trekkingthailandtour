import React from "react";
import Head from "next/head";
import AuthButton from "../auth/auth-button";
import { useRouter } from "next/router";

function Forbidden({ user }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Admin only</title>
      </Head>

      <div
        className={`w-screen h-screen flex flex-col gap-3  items-center justify-center bg-main-color`}
      >
        <div className="text-xl font-Poppins text-white md:text-3xl font-Kanit">
          Only admin can access this page
        </div>
        <div>
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded-lg bg-supper-main-color text-white drop-shadow-md active:ring-2 ring-white 
            hover:scale-105 transition duration-100
          "
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Forbidden;
