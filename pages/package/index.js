import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Head from "next/head";
import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GiMountains } from "react-icons/gi";
import { FaMountainCity } from "react-icons/fa6";
import { AiFillStar } from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { sanityClient, urlFor } from "@/sanity";
import { PortableText } from "@portabletext/react";
import { useRouter } from "next/router";
import Link from "next/link";
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

function Index({ tours }) {
  const router = useRouter();
  return (
    <div className="font-Poppins bg-third-color">
      <Head>
        <title>Package tours</title>
      </Head>

      <Navbar />

      <main className="pt-28">
        <section className="w-full h-max flex flex-col justify-start items-center">
          <div className="uppercase font-Poppins text-center ">
            <h1 className="font-medium text-5xl text-main-color">
              Our packages
            </h1>
            <h2 className="text-xl font-medium text-supper-main-color">
              Choose your own favor
            </h2>
          </div>
        </section>
        <section className="flex w-full">
          <Swiper
            pagination={true}
            spaceBetween={20}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            scrollbar={{ draggable: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className="w-3/4 flex justify-center my-10 mySwiper"
          >
            {tours.map((tour, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="w-full flex justify-center">
                    <div
                      className="w-full h-max  bg-second-color rounded-lg gap-5 overflow-hidden
                    flex flex-col justify-start items-center"
                    >
                      <header className="w-full flex flex-col gap-0">
                        <div className="w-full px-10 pt-5 pb-1 flex gap-2 items-center">
                          <div
                            className="w-8 h-8 text-2xl rounded-full flex items-center 
                          justify-center bg-supper-main-color text-white"
                          >
                            {packageData[index].icon}
                          </div>

                          <h2 className="text-white font-medium lg:w-52 ">
                            {tour.title}
                          </h2>
                        </div>
                        <span className="px-10 text-white font-light text-sm">
                          {tour.shortDescription}
                        </span>
                      </header>
                      <div className=" mt-5  gap-2 flex flex-col justify-center items-center">
                        <span className="text-supper-main-color font-semibold text-7xl">
                          {tour.subTour?.length}
                        </span>
                        <span className="text-3xl text-white">PACKAGES</span>
                        <Link
                          href={`/package/${tour.slug.current}`}
                          className="w-max px-10 py-2 rounded-xl bg-supper-main-color text-sm font-semibold transition duration-150 hover:ring-2 ring-white
                         text-white hover:drop-shadow-lg"
                        >
                          Check it Out
                        </Link>
                      </div>
                      {tour?.coverImage?.asset?.url && (
                        <div className="w-full h-40 bg-slate-400 relative">
                          <Image
                            src={tour.coverImage.asset.url}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={tour.coverImage.asset.metadata.lqip}
                          />
                        </div>
                      )}
                      <ul className="mt-5 w-full px-5 flex flex-col gap-1 mb-5 ">
                        <span className="text-sm mb-5 text-white">
                          {tour.title} includes:{" "}
                        </span>
                        {tour.subTour?.map((list, index) => {
                          return (
                            <Link
                              href={`/package/${tour.slug.current}#${list.slug.current}`}
                              key={index}
                              className="text-xs text-white font-light flex gap-2 items-center hover:font-medium cursor-pointer"
                            >
                              <div className="w-2 h-2 rounded-full bg-supper-main-color"></div>
                              {list.title}
                            </Link>
                          );
                        })}
                      </ul>
                      <Link
                        href={`/package/${tour.slug.current}`}
                        className="w-full py-2 text-center text-white font-semibold bg-main-color hover:bg-supper-main-color transition duration-150
                       uppercase"
                      >
                        See all details
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        {tours.map((tour, index) => {
          return (
            <div key={index}>
              <div
                className={`w-full flex justify-center md:justify-between ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-10/12 h-96  md:w-5/12 ml-0 mr-0 gap-2 ${
                    index % 2 === 0 ? "md:ml-10 lg:ml-20" : "md:mr-10 lg:mr-20"
                  } text-center  
                flex flex-col items-center justify-center `}
                >
                  <h2 className="uppercase mb-2 text-supper-main-color text-lg lg:text-3xl font-semibold">
                    {tour.title}
                  </h2>
                  <div className="text-xs md:text-xs lg:text-base text-black w-10/12 md:w-11/12 leading-tight font-normal">
                    <PortableText value={tour.body} />
                  </div>

                  <Link
                    href={`/package/${tour.slug.current}`}
                    className="bg-supper-main-color px-7 py-2 md:px-10 md:py-2
                   rounded-lg text-white drop-shadow-md hover:ring-2 ring-white"
                  >
                    SEE ALL DETAIL
                  </Link>
                </div>
                <div className="w-5/12 h-96 hidden md:block  relative overflow-hidden group">
                  <Image
                    src={tour.mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110"
                    placeholder="blur"
                    alt={tour.title + "At TREKKING THAILAND TOUR"}
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.mainImage.asset.metadata.lqip}
                  />
                  <div
                    className="w-full flex flex-col justify-center items-center
                   h-full bg-second-color/0 text-center group-hover:bg-second-color/70 transition duration-150 translate-y-96 group-hover:translate-y-0 "
                  >
                    <h3 className="text-sm md:text-3xl font-bold text-white">
                      {tour.title}
                    </h3>
                    <h6 className="text-xs md:text-lg font-normal w-full md:w-3/4 text-white">
                      {tour.description}
                    </h6>
                  </div>
                </div>
              </div>
              <section className="w-full grid grid-cols-4 grid-rows-2 h-96">
                <div className="bg-yellow-200 col-span-1 row-span-1 relative overflow-hidden group">
                  <Image
                    src={tour.images[0].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[0].mainImage.asset.metadata.lqip}
                    alt={tour.images[0].title + "At TREKKING THAILAND TOUR"}
                  />
                  <div
                    className="w-full hidden  md:flex flex-col justify-center items-center
                   h-full bg-second-color/0 text-center group-hover:bg-second-color/70 transition duration-150 translate-y-96 group-hover:translate-y-0 "
                  >
                    <h3 className="text-sm md:text-xl font-semibold text-white">
                      {tour.images[0].title}
                    </h3>
                    <h6 className="font-normal text-xs md:text-sm mt-2 w-3/4 text-white">
                      {tour.images[0]?.description}
                    </h6>
                  </div>
                </div>
                <div className="bg-blue-200 col-span-2 row-span-1 relative overflow-hidden group">
                  <Image
                    src={tour.images[2].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110 object-[left_calc(50%)_top_calc(34%)] "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[2].mainImage.asset.metadata.lqip}
                    alt={tour.images[2].title + "At TREKKING THAILAND TOUR"}
                  />
                  <div
                    className="w-full hidden  md:flex flex-col justify-center items-center
                   h-full bg-second-color/0 text-center group-hover:bg-second-color/70 transition duration-150 translate-y-96 group-hover:translate-y-0 "
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {tour.images[2].title}
                    </h3>
                    <h6 className="font-normal text-sm mt-2 w-3/4 text-white">
                      {tour.images[2]?.description}
                    </h6>
                  </div>
                </div>
                <div className="bg-gray-200 col-span-1 row-span-2 relative overflow-hidden group  ">
                  <Image
                    src={tour.images[1].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[1].mainImage.asset.metadata.lqip}
                    alt={tour.images[1].title + "At TREKKING THAILAND TOUR"}
                  />
                  <div
                    className="w-full hidden  md:flex flex-col justify-center items-center
                   h-full bg-second-color/0 text-center group-hover:bg-second-color/70 transition duration-150 translate-y-96 group-hover:translate-y-0 "
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {tour.images[1].title}
                    </h3>
                    <h6 className="font-normal text-sm mt-2 w-3/4 text-white">
                      {tour.images[1]?.description}
                    </h6>
                  </div>
                </div>
                <div className="bg-pink-200 col-span-1 row-span-1 relative overflow-hidden group">
                  <Image
                    src={tour.images[3].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[3].mainImage.asset.metadata.lqip}
                    alt={tour.images[3].title + "At TREKKING THAILAND TOUR"}
                  />
                  <div
                    className="w-full hidden  md:flex flex-col justify-center items-center
                   h-full bg-second-color/0 text-center group-hover:bg-second-color/70 transition duration-150 translate-y-96 group-hover:translate-y-0 "
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {tour.images[3].title}
                    </h3>
                    <h6 className="font-normal text-sm mt-2 w-3/4 text-white">
                      {tour.images[3]?.description}
                    </h6>
                  </div>
                </div>
                <div className="bg-yellow-200 col-span-1 row-span-1 relative overflow-hidden group">
                  <Image
                    src={tour.images[4].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[4].mainImage.asset.metadata.lqip}
                    alt={tour.images[4].title + "At TREKKING THAILAND TOUR"}
                  />
                  <div
                    className="w-full hidden  md:flex flex-col justify-center items-center
                   h-full bg-second-color/0 text-center group-hover:bg-second-color/70 transition duration-150 translate-y-96 group-hover:translate-y-0 "
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {tour.images[4].title}
                    </h3>
                    <h6 className="font-normal text-sm mt-2 w-3/4 text-white">
                      {tour.images[4]?.description}
                    </h6>
                  </div>
                </div>
                <div className="bg-green-200 col-span-1 row-span-1 relative overflow-hidden group">
                  <Image
                    src={tour.images[5].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[5].mainImage.asset.metadata.lqip}
                    alt={tour.images[5].title + "At TREKKING THAILAND TOUR"}
                  />
                  <div
                    className="w-full hidden  md:flex flex-col justify-center items-center
                   h-full bg-second-color/0 text-center group-hover:bg-second-color/70 transition duration-150 translate-y-96 group-hover:translate-y-0 "
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {tour.images[5].title}
                    </h3>
                    <h6 className="font-normal text-sm mt-2 w-3/4 text-white">
                      {tour.images[5]?.description}
                    </h6>
                  </div>
                </div>
              </section>
            </div>
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

export async function getStaticProps(context) {
  const query = `*[_type == "package-tour-detail"]{
    _id,
    title,
    slug,
    shortDescription,
    coverImage{
    asset->{
         url,
        metadata
          }
    },
    description,
    mainImage{
    asset->{
            url,
            metadata
          }
    },
    body,
  "subTour": subTour[]->{
      _id,
      title,
      slug
  },
  "images": images[]->{
    title,
    description,
      mainImage{
      asset->{
      url,
      metadata
      }
      }
  }
}`;
  const tours = await sanityClient.fetch(query);

  return {
    props: {
      tours,
    },
  };
}
