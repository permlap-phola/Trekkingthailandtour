import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Head from "next/head";
import React from "react";
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
const packageData = [
  {
    title: "Khao Yai Tour",
    icon: <GiMountains />,
    subTitle: "Sed nulla sagittis diam nunc a tortor. Pharetr",
    numberOfPackage: "7",
    mainPicture: "/image/tour/KhaoYai/client.jpg",
    blurDataURL:
      "data:image/jpeg;base64,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AAAAAAAAACiKCiAigAAA1CDIoACoAogCiKAqAiiAKqAKIAogCiAKIAogCiAAICoAAgACAIAICKCCCiFQEqVa5UKgCgAAAAAAAAAAAAAAAAAAAAAAAAAAAKIAoAgADUIMiiAKIAoigogCiKAqAiiAKqAKIAogCiAKIAqAACAqAAIAIACCKAIAglFSpVRRKlEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUQBpEGUURQFQBRAFEUFEAVUBFEAURQAAFQBRAFQAAAAQFQAEABAUEEAQARKqCpUoiggCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAgiKIAoAKIAoioCoAoiiKIAogCiKAqAKIAqAAAAIAAgKgiioACCAIAJUEVRBAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHuAiAAAAKIAoACoIKIqgqCIoigAAAAAAAACAKgACCgCAqCAIqAIIKIIoIAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3EVEAAAAAAFQBQAAAUQBQBAAABAAAAAEAAFAEABAAQBAAQQUQFEAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAewoiAAAAAAAACoAoAAAAAAAiiAKgAAAAgKgAAgAIAioAgCoCKCKgoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3ARAAAAAAAAAABUUAAAAAAAQEUQAAABAVAAEAAQAEFEABAUEAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7gIgAAAAAAAAAAAAqAKIAAAAAAAIAAAggAAgAIKAgAIACKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3FERBQEFAQUBBQEFAQVAAAAAAAAAEVAAAEAAEAABAQAAEAARUVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgBEAAAAAAAAAAAAQVAAAAAAQAAAEAAAQAEABAARUAAVUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpARAAAAEFAQVAAAAAEVAAAAAEAAAEAARUABAAQAAEAABFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpARAAAAAAAAEFQAABFAQAAAEAARUAABAAEABAABAAFBFQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpARAAAAAAAABFQAAAAEAAABAAEVAAAQAEABAAEVAAFURUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpARAAAAAAAABAAAAABAAAAQABAAABAAQAEAAQAAFUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z",
    listOfSubPackage: [
      { title: "Khao Yai Amazing One day Tour" },
      { title: "Half Day tour Khao Yai" },
      { title: "One Day and Night Safari Khao Yai National Park" },
      { title: "2 Days Tour at Khao Yai National Park" },
      { title: "Half Day Tour (Bat Cave)" },
      { title: "Reptile Tour at Khao Yai" },
      { title: "Wildlife Photography Khao Yai" },
    ],
  },
  {
    title: "Korat The UNESCO Triple Heritage City Tour",
    icon: <FaMountainCity />,
    subTitle: "Aliquet fermentum facilisis elementum",
    numberOfPackage: "1",
    mainPicture: "/image/tour/UNESCO/client.jpg",
    blurDataURL:
      "data:image/jpeg;base64,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",
    listOfSubPackage: [{ title: "3 Days 2 Nights" }],
  },
  {
    title: "Special Tour",

    subTitle: "Aliquet fermentum facilisis elementum",
    numberOfPackage: "2",
    icon: <AiFillStar />,
    mainPicture: "/image/tour/special/snake.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADlAVgDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAQACAwQG/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQACA//EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A+SBTDmEkigQUgQiEkSEQkkikkikiiGUUQEUgClhwBGKRrAgTiwFFYcSSRJBSSSKKSSSSSKSSSSSSeNJFBEJIFEgFIgFFBFJArDiQwnDIAMOGRqQJnDjUjUgGMY1I1hwLGcONYcCxnDjWLEmcONYsCGLGsWJDFhxYkEcRQRSQRRQSRSSSSSSDxpIlJJIJJEIokLDhxHGcOHDiODDIZGpAsZkakMhkSwSGRqQyBYJDhkawBnDjWHAmcONYcQYw41hwJnFjWLEmcWNYsQZxY1ixJnFjWDEGcTQKAaBQBRQSSSSSDxoglJJJJJGJFJqLFhw4mhhwyGRFSGQyGRISNSGQyBCRqQyGQASGQyNSBM4caw4AzhxrDiDOLGsOBM4saxYgzixrFiTGLGsWEMYsawJMhoFMhoEAEJBJEJBJPKkiQkUkkU1EkU1EUYmlGpBGoipGpBGpAlI1IpDIEZDIpGpABI1ikOALDhw4kMOHFgAw4cWIDFjWLEmcGNYsQZwY1gSZDQIZFaopTNFNFQZBopQSBCSRTypIpJJEpFNxEGJqEwNQNKNQRqImGCNQIxqCNQBRqKGBGGRQwBHFCAsOIoJFBDEUgA0EAy0CmRWqKgzWa1RSmazWqzSBWa1WaUAaCEginmSTRSBSJBDcKRTcJghiLUMEMBajUZjUCajUZjUCMaghgDUIhAMKISKQCKSCSSARCQFIpArNarNQFZrVZpTNFNZpQrNNFaDNBoISCSeZJNFJIokEOkJBiajUMZjUDTUajEagLUajMagTUajMagDUajMMCajUZhgDREIBSQBSSCSSCCSQBBArNNFKFZprNIFZprNKFZprNIFBrJSSRDzIJpooJJoslNxoxkwNxuGMwxFuNRiNQFuNRiNRlNwxmNQBqNRiNQJqNRiNANGMkBoslAoatQKGrQCENKVFQqAopZpQoqopArNNZpQrNNZpQoVZaBQ1IPNq0atabwrRo0nG5TrGmVNRvTKxrUobblMYlalBblajErUoTcajErUoTcajnK1KA3K1KxKZQm41rGmUBvTrGnQGtOs6tAa06zq1BrRo1agdGjVqS0atGkK0Wi0WpK1mm1m0oUWq1mtBWs1Ws2lKs6bWSCmUU8ySLoiEUSEjGiCm4ZWpWDKi6StSucrUrJdJWpXOVqUB0lalc5WpQG5WpXOVqUBuU6xKdCb06xp0BvVrGnQG9WsatQb1axq1JrRo0ag1o1nRpTVrNo0WoG1m1Ws2lK0Wi0WtJWs2q1m0hWhWs6UUNRDgkk6JJJIhJNFkpqNFklotSsFNOkrUrlK1KMDrKZXOVqVkOkplc5WtAb1rXPToTenWNWgOmrWNWoOmrWNWgN6NZ0ag3o1nVqTWjWdGlNaLWdGoG0Wi0aUrRaLRa0laLRaLSlaNFo1pHUzqSYSQaSSSSSSJZKMJCTTSBJJ1lItytSuemUYnWU65StSjA6adc9OjA6atY1aA6atY1aA3q1jVoDerWNWoN6NZ0ak3o1jVpDWjWdGpNaLWdGtJq1m0aLSjazaLRrSOjRqJOoJIJJkpJJJJJJJJEhEkhJokJIoJE61KwUm9OuenRgdNWsatAb06xq1kN6tY1ag3o1nVoDWrWNWkNatY1ak1o1nVpR0aNBR0aE0VqSJSSSSSSCSZSSSSSSSSSSKRJSSJSSKSSSSSSKSSKQCKTISSTKCQCSRQSSASRICRKSRKSRSSSSSST//Z",
    listOfSubPackage: [
      { title: "Bird watching Tour" },
      { title: "BT-2 Southern Thailand Tours 5 Days" },
    ],
  },
];
function Index({ tours }) {
  return (
    <div className="font-Poppins bg-third-color">
      <Head>
        <title>Package tours</title>
      </Head>
      <header>
        <Navbar />
      </header>
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
            {packageData.map((tour, index) => {
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
                            {tour.icon}
                          </div>

                          <h2 className="text-white font-medium lg:w-52 ">
                            {tour.title}
                          </h2>
                        </div>
                        <span className="px-10 text-white font-light text-sm">
                          {tour.subTitle}
                        </span>
                      </header>
                      <div className=" mt-5  gap-2 flex flex-col justify-center items-center">
                        <span className="text-supper-main-color font-semibold text-7xl">
                          {tour.numberOfPackage}
                        </span>
                        <span className="text-3xl text-white">PACKAGES</span>
                        <button
                          className="w-max px-10 py-2 rounded-xl bg-supper-main-color text-sm font-semibold transition duration-150 hover:ring-2 ring-white
                         text-white hover:drop-shadow-lg"
                        >
                          BUY NOW
                        </button>
                      </div>
                      <div className="w-full h-40 bg-slate-400 relative">
                        <Image
                          src={tour.mainPicture}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={tour.blurDataURL}
                        />
                      </div>
                      <ul className="mt-5 w-full px-5 flex flex-col gap-1 mb-5 ">
                        <span className="text-sm mb-5 text-white">
                          {tour.title} includes:{" "}
                        </span>
                        {tour.listOfSubPackage.map((list, index) => {
                          return (
                            <li
                              key={index}
                              className="text-xs text-white font-light flex gap-2 items-center hover:font-medium cursor-pointer"
                            >
                              <div className="w-2 h-2 rounded-full bg-supper-main-color"></div>
                              {list.title}
                            </li>
                          );
                        })}
                      </ul>
                      <button
                        className="w-full py-2 text-center text-white font-semibold bg-main-color hover:bg-supper-main-color transition duration-150
                       uppercase"
                      >
                        See all details
                      </button>
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
              <section className="w-full flex justify-between">
                <div className="w-5/12 ml-10 gap-5 text-center  flex flex-col items-center justify-center ">
                  <h2 className="uppercase mb-2 text-supper-main-color text-lg lg:text-3xl font-semibold">
                    {tour.title}
                  </h2>
                  <div className="text-sm md:text-xl text-black leading-tight font-normal">
                    <PortableText value={tour.body} />
                  </div>

                  <button className="bg-supper-main-color px-7 py-2 md:px-10 md:py-2 rounded-lg text-white drop-shadow-md hover:ring-2 ring-white">
                    SEE ALL DETAIL
                  </button>
                </div>
                <div className="w-5/12 h-96 bg-slate-500 relative overflow-hidden">
                  <Image
                    src={tour.mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 hover:scale-110"
                    placeholder="blur"
                    alt={tour.title + "At TREKKING THAILAND TOUR"}
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.mainImage.asset.metadata.lqip}
                  />
                </div>
              </section>
              <section className="w-full grid grid-cols-4 grid-rows-2 h-96">
                <div className="bg-yellow-200 col-span-1 row-span-1 relative overflow-hidden">
                  <Image
                    src={tour.images[0].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 hover:scale-110"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[0].mainImage.asset.metadata.lqip}
                    alt={tour.images[0].title + "At TREKKING THAILAND TOUR"}
                  />
                </div>
                <div className="bg-blue-200 col-span-2 row-span-1 relative overflow-hidden">
                  <Image
                    src={tour.images[2].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[2].mainImage.asset.metadata.lqip}
                    alt={tour.images[2].title + "At TREKKING THAILAND TOUR"}
                  />
                </div>
                <div className="bg-gray-200 col-span-1 row-span-2 relative overflow-hidden  ">
                  <Image
                    src={tour.images[1].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[1].mainImage.asset.metadata.lqip}
                    alt={tour.images[1].title + "At TREKKING THAILAND TOUR"}
                  />
                </div>
                <div className="bg-pink-200 col-span-1 row-span-1 relative overflow-hidden">
                  <Image
                    src={tour.images[3].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[3].mainImage.asset.metadata.lqip}
                    alt={tour.images[3].title + "At TREKKING THAILAND TOUR"}
                  />
                </div>
                <div className="bg-yellow-200 col-span-1 row-span-1 relative overflow-hidden">
                  <Image
                    src={tour.images[4].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[4].mainImage.asset.metadata.lqip}
                    alt={tour.images[4].title + "At TREKKING THAILAND TOUR"}
                  />
                </div>
                <div className="bg-green-200 col-span-1 row-span-1 relative overflow-hidden">
                  <Image
                    src={tour.images[5].mainImage.asset.url}
                    fill
                    className="object-cover transition duration-300 hover:scale-110 "
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 700px"
                    blurDataURL={tour.images[5].mainImage.asset.metadata.lqip}
                    alt={tour.images[5].title + "At TREKKING THAILAND TOUR"}
                  />
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

export async function getServerSideProps(context) {
  const query = `*[_type == "package-tour-detail"]{
    _id,
      title,
      mainImage{
      asset->{
              url,
              metadata
            }
      },
      body,
    "images": images[]->{
      title,
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
