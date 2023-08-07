import React from "react";
import Head from "next/head";
import AuthButton from "../auth/auth-button";

function Unauthorized({ user }) {
  return (
    <div>
      <Head>
        <title>Login first</title>
      </Head>

      <div
        className={`w-screen h-screen flex flex-col gap-3  items-center justify-center bg-main-color`}
      >
        <div className="text-xl font-Poppins text-white md:text-3xl font-Kanit">
          Please login first
        </div>
        <div>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
