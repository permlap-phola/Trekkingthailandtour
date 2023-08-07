import AuthButton from "@/components/auth/auth-button";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Checkout from "@/components/payment/checkout";
import { sanityClient } from "@/sanity";
import { GetUserCookie } from "@/services/user";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import Image from "next/image";
import { parseCookies } from "nookies";
import React from "react";
import { useState } from "react";
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

function Index({ tourPackage, randomNumberIcon, user }) {
  const [tiggerCheckOut, setTiggerCheckOut] = useState(false);
  const [selectTour, setSelectTour] = useState({
    title: "",
    description: "",
    price: 0,
    people: 0,
    images: [],
  });
  return (
    <div className="bg-third-color w-full h-full font-Poppins">
      <Head>
        <title>{tourPackage.title}</title>
      </Head>
      {tiggerCheckOut && (
        <Checkout
          selectTour={selectTour}
          setTiggerCheckOut={setTiggerCheckOut}
        />
      )}

      <Navbar />

      <header className="mt-20 md:pt-20">
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
            <section
              key={index}
              id={subTour.slug.current}
              className="w-full lg:w-full flex flex-col items-center"
            >
              <header className="flex flex-col gap-5 mb-20 w-10/12">
                <h2 className="uppercase font-bold text-3xl text-supper-main-color">
                  Package {index + 1}
                </h2>
                <h3 className="font-semibold md:w-11/12  lg:w-6/12 text-main-color text-xl uppercase">
                  {subTour.title}
                </h3>
                <div className="w-full text-main-color font-normal text-sm lg:text-base">
                  <PortableText value={subTour.description} />
                </div>
                <div className="w-full  grid grid-cols-3 lg:grid-cols-6 ">
                  {subTour.images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-main-color  w-full h-20 lg:w-40 lg:h-40 relative"
                      >
                        <Image
                          src={image?.coverImage?.asset?.url}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-110 "
                          placeholder="blur"
                          sizes="(max-width: 768px) 100vw, 700px"
                          blurDataURL={image?.coverImage?.asset?.metadata?.lqip}
                          alt={
                            image?.coverImage?.title +
                            "At TREKKING THAILAND TOUR"
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </header>
              <main className="flex flex-col w-12/12 gap-10 justify-start items-center">
                <h3 className="uppercase font-semibold text-xl">
                  activity schedule
                </h3>
                <table className="flex flex-col justify-start items-center">
                  <tbody>
                    {subTour.schedule.map((list, index) => {
                      const date = new Date(list.time);
                      const formattedTime = date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      return (
                        <tr
                          key={index}
                          className="flex w-full justify-start tems-center flex-col md:flex-row
                         md:mb-10 mb-1 gap-3 md:gap-10 hover:scale-110 transition duration-150  rounded-xl p-1 "
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
                  <div className=" gap-5 w-full md:w-11/12 grid grid-cols-2 md:grid-cols-6 mt-5  md:p-5 ">
                    {subTour.price.map((price, index) => {
                      return (
                        <div
                          key={index}
                          className=" flex-none w-40 h-40 bg-main-color  rounded-lg 
                        text-center flex flex-col justify-around items-center"
                        >
                          <span className="text-white font-normal">
                            {price.description}
                          </span>
                          <span className="l text-3xl font-semibold text-supper-main-color">
                            {price.price.toLocaleString("en-US")}
                          </span>
                          <span className="text-white font-normal">THB</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </main>
              <footer
                className="w-full flex items-center bg-main-color/60  sticky bottom-0 py-5
                justify-center mt-10 mb-40 gap-2 md:gap-5"
              >
                <h3 className="md:font-semibold font-medium  text-white text-xs max-w-4xl w-40 md:w-max lg:text-xl uppercase">
                  {subTour.title}
                </h3>
                {user ? (
                  <button
                    onClick={() => {
                      setSelectTour(() => {
                        return {
                          title: subTour.title,
                          description: subTour.description,
                          price: subTour.price,
                          images: subTour.images,
                        };
                      });
                      setTiggerCheckOut(() => true);
                      document.body.style.overflow = "hidden";
                    }}
                    className="w-max text-white bg-supper-main-color px-8 py-3
                   rounded-lg text-xs md:text-lg font-bold drop-shadow-md hover:scale-110 transition duration-150"
                  >
                    BUY NOW
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <AuthButton />
                    <span className="text-xs w-28 text-center text-white">
                      please login first before buying
                    </span>
                  </div>
                )}
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
  const cookies = parseCookies(context);
  const accessToken = cookies.access_token;
  const userData = await GetUserCookie({
    access_token: accessToken,
  }).catch((err) => console.log(err));

  const packageSlug = await context.params.packageSlug;
  const query = `*[_type == "package-tour-detail" && slug.current == "${packageSlug}"]{
    _id,
    title,
    slug,
    description,
   
    "subTour": subTour[] ->{
  
    "images": images[]->{
    coverImage{
     asset->{
         url,
        metadata
         }
      },
        },
    description,
    title,
    slug,
    "price": price[]->{
      _id,
      people,
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
      user: userData ? userData.data : null,
    },
  };
}
