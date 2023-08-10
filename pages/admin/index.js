import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Forbidden from "@/components/status/forbidden";
import Unauthorized from "@/components/status/unauthorized";
import { GetAllPaymentFromUser } from "@/services/admin/payment";
import { GetUserCookie } from "@/services/user";
import { Pagination, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import React, { useState } from "react";

function Index({ user, error }) {
  const [page, setPage] = useState(1);
  const payments = useQuery(
    ["admin-payments-history", page],
    () => GetAllPaymentFromUser({ page: page }),
    { keepPreviousData: true }
  );
  if (user?.role !== "admin") {
    return <Forbidden />;
  }
  if (error?.statusCode === 401) {
    return <Unauthorized />;
  }
  return (
    <div className="bg-third-color">
      <Navbar />
      <header className="flex items-center justify-center mt-20">
        <h1 className="text-3xl font-semibold font-Poppins">
          Payments overview
        </h1>
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
                  <td className="w-52">email</td>
                  <td className="w-52">name</td>
                  <td className="w-52">phone</td>
                  <td className="w-60">Title</td>
                  <td className="w-80">description</td>
                  <td className="w-28">full price</td>
                  <td className="w-28">deposit</td>
                  <td className="w-32">pay at</td>
                </tr>
              </thead>
              <tbody>
                {payments?.data?.payments?.map((payment, index) => {
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
                      <td className="w-52 text-supper-main-color">
                        {payment.user.email}
                      </td>
                      <td className="w-52">{payment.user.name}</td>
                      <td className="w-52">{payment.user.phone}</td>
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

export default Index;
export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const cookies = parseCookies(context);
  const accessToken = cookies.access_token;

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
