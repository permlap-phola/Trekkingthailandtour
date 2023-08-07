import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Unauthorized from "@/components/status/unauthorized";
import { GetAllPayment } from "@/services/payment";
import { GetUserCookie } from "@/services/user";
import { Pagination, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import { parseCookies } from "nookies";
import React from "react";
import { useState } from "react";

function PaymentHistory({ user, error }) {
  const [page, setPage] = useState(1);
  const payments = useQuery(
    ["payments-history", page],
    () => GetAllPayment({ page: page }),
    { keepPreviousData: true }
  );
  if (error?.statusCode === 401) {
    return <Unauthorized />;
  }

  return (
    <div className="bg-third-color">
      <Head>
        <title>Payment history</title>
      </Head>
      <Navbar />
      <header className="w-full flex flex-col   gap-10 font-Poppins justify-center items-center">
        <div className="flex w-10/12 justify-center items-center gap-0 md:gap-3">
          <div className="flex justify-center items-start flex-col">
            <span className="text-main-color">Welcome</span>
            <h1 className="font-semibold text-3xl text-supper-main-color">
              {user.name}
            </h1>
          </div>

          <div className="md:w-32 w-14 md:h-32 h-14 bg-main-color flex items-center justify-center rounded-full relative">
            {user.image ? (
              <Image src={user.image} fill className="object-cover" />
            ) : (
              <span className="uppercase font-sans font-black text-xl md:text-7xl text-white">
                {user.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <h2 className="text-xl text-center md:text-5xl w-full  font-semibold text-main-color">
          Payment history
        </h2>
      </header>
      {payments.isLoading ? (
        <div className="flex flex-col gap-5 items-center my-20">
          <Skeleton variant="rounded" width={900} height={50} />
          <Skeleton variant="rounded" width={600} height={50} />
          <Skeleton variant="rounded" width={1200} height={50} />
        </div>
      ) : (
        <main className="w-full mb-5 font-Poppins gap-3 mt-20 flex flex-col items-center justify-center">
          <div className="w-11/12 overflow-auto table-wrp block max-h-96">
            <table className="table-auto w-full sticky top-0  bg-white ">
              <thead className="sticky top-0">
                <tr
                  className="flex gap-5 border-b py-4 self-start	 
                 px-2 font-semibold  bg-main-color text-white 
                 drop-shadow-md"
                >
                  <td className="w-60">Title</td>
                  <td className="w-80">description</td>
                  <td className="w-28">full price</td>
                  <td className="w-28">deposit</td>
                  <td className="w-32">pay at</td>
                </tr>
              </thead>
              <tbody>
                {payments?.data?.payments.map((payment, index) => {
                  const date = new Date(payment.createAt);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={index} className="flex gap-5 py-3 px-2 border-b">
                      <td className="w-60 font-semibold">{payment.name}</td>
                      <td className="w-80">{payment.description}</td>
                      <td className="w-28">{payment.fullPrice}</td>
                      <td className="w-28 ">
                        <span className="w-max p-2 bg-supper-main-color rounded-md text-white font-medium">
                          {payment.deposit}
                        </span>
                      </td>
                      <td className="w-60">{formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            count={payments?.data?.totalPages}
            onChange={(e, page) => setPage(page)}
          />
        </main>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PaymentHistory;
export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const cookies = parseCookies(context);
  const accessToken = cookies.access_token;

  if (!accessToken && !query.access_token) {
    return {
      props: {
        error: {
          statusCode: 401,
          message: "unauthorized",
        },
      },
    };
  } else if (query.access_token) {
    try {
      const userData = await GetUserCookie({
        access_token: query.access_token,
      });
      const user = userData.data;

      return {
        props: {
          user,
        },
      };
    } catch (err) {
      return {
        props: {
          error: {
            statusCode: 401,
            message: "unauthorized",
          },
        },
      };
    }
  } else if (accessToken) {
    try {
      const userData = await GetUserCookie({
        access_token: accessToken,
      });
      const user = userData.data;

      return {
        props: {
          user,
        },
      };
    } catch (err) {
      return {
        props: {
          error: {
            statusCode: 401,
            message: "unauthorized",
          },
        },
      };
    }
  }
}
