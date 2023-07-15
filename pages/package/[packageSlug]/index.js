import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { sanityClient } from "@/sanity";
import { PortableText } from "@portabletext/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaMountainCity } from "react-icons/fa6";
import { GiMountains } from "react-icons/gi";
const packageData = [
  {
    icon: <GiMountains />,
  },
  {
    icon: <FaMountainCity />,
  },
  {
    icon: <AiFillStar />,
  },
];

function Index({ tourPackage, randomNumberIcon }) {
  return (
    <div className="bg-third-color w-full h-full font-Poppins">
      <header className="pt-40">
        <Navbar />
        <section className="flex  flex-col justify-center items-center w-full">
          <div className="w-10/12 md:w-11/12 lg:w-9/12 flex flex-col gap-5 justify-center items-center text-center">
            <h5 className="text-xs md:text-xl md:hidden lg:block font-normal">
              {tourPackage.slug.current}
            </h5>
            <div className="w-full my-4 flex gap-3 lg:flex-row flex-col justify-center items-center">
              <div
                className="w-12 h-12 text-3xl rounded-full flex items-center 
                          justify-center bg-supper-main-color text-white"
              >
                {packageData[randomNumberIcon].icon}
              </div>
              <span className="md:text-3xl lg:text-5xl flex gap-2 font-semibold text-main-color ">
                {tourPackage.title}
              </span>
            </div>
            <h5 className="md:text-lg lg:text-xl font-normal">
              {tourPackage.description}
            </h5>
          </div>
        </section>
      </header>
      <main className="flex-col flex w-full justify-start items-center mt-28">
        {tourPackage.subTour.map((subTour, index) => {
          return (
            <section id={subTour.slug.current} className="w-10/12 lg:w-11/12">
              <header className="flex flex-col gap-5 mb-20">
                <h2 className="uppercase font-bold text-3xl text-supper-main-color">
                  Package {index + 1}
                </h2>
                <h3 className="font-semibold md:w-11/12  lg:w-6/12 text-main-color text-xl uppercase">
                  {subTour.title}
                </h3>
                <div className="w-full text-main-color font-normal text-sm lg:text-base">
                  <PortableText value={subTour.description} />
                </div>
              </header>
              <main className="flex flex-col w-12/12 gap-10 justify-start items-center">
                <h3 className="uppercase font-semibold text-xl">
                  activity schedule
                </h3>
                <table className="flex flex-col justify-start items-center">
                  <tbody>
                    {subTour.schedule.map((list) => {
                      const date = new Date(list.time);
                      const formattedTime = date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      return (
                        <tr
                          className="flex w-full justify-start tems-center flex-col md:flex-row
                         mb-10 gap-3 md:gap-10 hover:ring-2 ring-white rounded-xl p-1 "
                        >
                          <td
                            className={`flex items-center p-2 text-center text-sm font-bold   text-black justify-center`}
                          >
                            <div
                              className={`${
                                list?.day
                                  ? "bg-supper-main-color"
                                  : "bg-transparent"
                              }w-10 text-xs md:text-sm md:w-20 truncate lg:w-40 px-5 py-2`}
                            >
                              {list?.day}
                            </div>
                          </td>

                          <td className="flex items-center w-20 justify-center">
                            {formattedTime}
                          </td>
                          <td className="flex w-8 md:w-20 justify-start items-center ">
                            <div className="w-8 md:w-20 h-1 bg-supper-main-color"></div>
                          </td>
                          <td
                            className="flex  md:min-w-[10rem] w-60 md:w-max md:max-w-xs 
                          lg:max-w-2xl h-max p-3 rounded-lg text-white bg-second-color  
                          justify-start items-center text-xs lg:text-base font-light"
                          >
                            <PortableText value={list.description} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <section className="w-full flex flex-col justify-start items-center">
                  <h3 className="w-max h-max p-3 bg-second-color text-white">
                    RATE/PERSON
                  </h3>
                  <div className="flex gap-5 w-80 md:w-[40rem] lg:w-[60rem]  p-5 overflow-x-auto ">
                    {subTour.price.map((price) => {
                      return (
                        <button
                          className=" flex-none w-40 h-40 bg-main-color hover:scale-110 transition duration-150 active:ring-4 ring-supper-main-color rounded-lg 
                        text-center flex flex-col justify-around items-center"
                        >
                          <span className="text-white font-normal">
                            {price.description}
                          </span>
                          <span className="l text-3xl font-semibold text-supper-main-color">
                            {price.price.toLocaleString("en-US")}
                          </span>
                          <span className="text-white font-normal">THB</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </main>
              <footer className="w-full flex justify-center mt-10 mb-60">
                <button className="w-max text-white bg-supper-main-color px-8 py-3 rounded-lg font-bold drop-shadow-md hover:scale-110 transition duration-150">
                  BUY NOW
                </button>
              </footer>
            </section>
          );
        })}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Index;

export async function getServerSideProps(context) {
  const packageSlug = await context.params.packageSlug;
  const query = `*[_type == "package-tour-detail" && slug.current == "${packageSlug}"]{
    _id,
    title,
    slug,
    description,
    "subTour": subTour[] ->{
    description,
    title,
    slug,
    "price": price[]->{
      _id,
      title,
      description,
      price,
    },
    "schedule": schedule[]->{
      _id,
      title,
      description,
      day,
      time,
    },
  }
}`;
  const tourPackage = await sanityClient.fetch(query);
  const randomNumberIcon = Math.floor(Math.random() * 3);
  return {
    props: {
      tourPackage: tourPackage[0],
      randomNumberIcon,
    },
  };
}
