import React, { useState, Fragment, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiLogOutCircle, BiUser, BiWrench } from "react-icons/bi";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUser } from "@/services/user";
import Loading from "../status/loading";
import { BsChevronCompactDown, BsChevronDoubleDown } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";

function AuthButton() {
  const [dropDown, setDropDown] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, data, refetch, isFetching, isError } = useQuery(
    ["user"],
    () => GetUser(),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (router.query.access_token) {
      setCookie(null, "access_token", router.query.access_token, {
        maxAge: 30 * 24 * 60 * 60, // Cookie expiration time in seconds (e.g., 30 days)
        path: "/", // Cookie path (can be adjusted based on your needs)
      });
      refetch();
    }
    refetch();
  }, [router.query?.access_token, router.isReady]);
  if (isFetching) {
    return <Loading />;
  }

  if (!data || data === "Unauthorized" || isError) {
    return (
      <div>
        <button
          onClick={() => router.push("/auth/sign-in")}
          className="lg:px-10 px-2 md:px-5 hover:ring-2 py-2 group ring-main-color flex items-center justify-center gap-5  font font-semibold active:ring-main-color active:ring-4
          text-main-color rounded-md drop-shadow-md bg-white "
        >
          <span className="text-main-color font-semibold">Login</span>
          <div className="flex items-center justify-center text-supper-main-color ">
            <FaUser size={23} />
          </div>
        </button>
      </div>
    );
  }

  const handleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const signOut = () => {
    destroyCookie(null, "access_token", { path: "/" });
    queryClient.removeQueries("user");
    refetch();
    router.push({
      pathname: "/",
    });
  };
  return (
    <Menu>
      <Menu.Button
        className="lg:px-10 relative  px-10 w-max md:px-5 hover:ring-2 py-2 group ring-main-color flex items-center
         justify-center gap-5  font font-semibold active:ring-main-color active:ring-4
        text-main-color rounded-md drop-shadow-md bg-white"
      >
        {data?.image ? (
          <div className="relative w-10 h-10 rounded-md  overflow-hidden">
            <Image
              src={data?.image}
              alt={data?.name}
              layout="fill"
              className=" object-cover "
              sizes="(max-width: 768px) 100vw"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-main-color flex justify-center items-center">
            <span className="uppercase font-sans font-black text-3xl text-white">
              {data?.name.charAt(0)}
            </span>
          </div>
        )}
        <span className=" text-sm h-min flex flex-col justify-center items-center gap-y-0  ">
          <span className="first-letter:uppercase font-semibold text-main-color font-Kanit  text-base ">
            {data.name}
          </span>
        </span>
        <div className="group-hover:scale-0 transition duration-100 group-hover:opacity-0  absolute right-3">
          <BsChevronCompactDown />
        </div>
        <div
          className="group-hover:scale-110 transition opacity-0 duration-200 
        group-hover:opacity-100 absolute right-3"
        >
          <BsChevronDoubleDown />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-50">
          <Menu.Item>
            {({ active }) => (
              <ul
                role="button"
                className="list-none flex flex-col gap-y-4 
                 bg-white rounded-md text-center drop-shadow-md p-2 relative md:absolute 
                  right-0 left-0 m-auto top-5 w-52 cursor-pointe     "
              >
                <li
                  onClick={() => {
                    router.push({
                      pathname: "/account/payment-history",
                    });
                  }}
                  className="flex justify-center items-center text-base font-light 
              gap-x-2 hover:font-bold cursor-pointer group  "
                >
                  <span>Payment history</span>
                  <span className="text-center flex items-center justify-center group-hover:scale-110 transition duration-150">
                    <MdOutlinePayments />
                  </span>
                </li>

                <li
                  onClick={() => {
                    router.push({
                      pathname: "/account/setting",
                    });
                  }}
                  className="flex justify-center items-center text-base font-light 
              gap-x-2 hover:font-bold cursor-pointer group  "
                >
                  <span>Account setting</span>
                  <span className="text-center flex items-center justify-center group-hover:scale-110 transition duration-150">
                    <BiUser />
                  </span>
                </li>
                <div className="arrow-left md:arrow-top absolute -left-3 top-auto bottom-auto"></div>
                <li
                  onClick={signOut}
                  className="flex justify-center items-center group text-base font-light gap-x-2 cursor-pointer
               hover:font-bold
            "
                >
                  <span>Logout</span>
                  <span className="text-center flex items-center justify-center group-hover:scale-110 transition duration-150">
                    <BiLogOutCircle />
                  </span>
                </li>
              </ul>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default AuthButton;
