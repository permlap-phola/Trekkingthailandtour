import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Loading from "@/components/status/loading";
import Unauthorized from "@/components/status/unauthorized";
import {
  GetUserCookie,
  UpdateUser,
  UploadProfilePicture,
} from "@/services/user";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import Head from "next/head";
import Image from "next/image";
import { parseCookies } from "nookies";
import React from "react";
import { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import Swal from "sweetalert2";

function Setting({ user, error }) {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    phone: user.phone,
    image: user.image,
  });
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setUserData((prev) => {
        return {
          ...prev,
          image: reader.result,
        };
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChangeUserData = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangePhone = (newValue) => {
    setUserData((prev) => {
      return {
        ...prev,
        phone: newValue,
      };
    });
  };

  const handleUploadProfile = async (e) => {
    try {
      e.preventDefault();
      if (!file) {
        return Swal.fire(
          "No file chosen❗",
          "please select one image to be your avatar",
          "error"
        );
      }
      const formData = new FormData();
      formData.append("file", file);
      setLoading((prev) => (prev = true));
      const updateProfile = await UploadProfilePicture({ formData });
      setLoading((prev) => (prev = false));
      setUserData((prev) => {
        return {
          ...prev,
          image: updateProfile.image,
        };
      });
      Swal.fire("success", "upload image is successful", "success");
    } catch (err) {
      setLoading((prev) => (prev = false));
      console.log(err);
      if (err.props.response.data.statusCode === 413) {
        Swal.fire(
          "error",
          "Your file is too large. We only allow image files with a maximum size of 1024x1024 pixels.",
          "error"
        );
      } else {
        Swal.fire("error", err?.props?.response?.data?.message, "error");
      }
    }
  };

  const handleSummitUpdateProfile = async () => {
    try {
      setLoading(() => true);
      const user = await UpdateUser({
        name: userData.name,
        phone: userData.phone,
      });
      Swal.fire("success", "update profile successfully", "errorsuccess");
      setLoading(() => false);
    } catch (err) {
      setLoading(() => false);
      Swal.fire("Error", err.props.response.data.message.toString(), "error");
    }
  };
  if (error?.statusCode === 401) {
    return <Unauthorized />;
  }
  return (
    <div className="bg-third-color font-Poppins">
      <Head>
        <title>Account setting</title>
      </Head>
      <Navbar />
      <main className="w-full h-screen flex flex-col justify-start pt-10 items-center">
        <h1 className="font-semibold text-3xl text-main-color mb-2">
          Account setting
        </h1>
        <div className="lg:w-6/12 gap-5 h-max flex flex-col justify-start items-center p-10   bg-white rounded-lg drop-shadow-md">
          <section className="flex flex-col items-center justify-start gap-2">
            <div className="w-40 h-40 bg-main-color  rounded-full relative flex items-center justify-center">
              {userData.image ? (
                <Image src={userData.image} fill className="object-cover" />
              ) : (
                <span className="uppercase font-sans font-black text-xl md:text-7xl text-white">
                  {userData.name.charAt(0)}
                </span>
              )}
              <label
                htmlFor="dropzone-file"
                className="absolute w-8 h-8 ring-2 ring-supper-main-color hover:scale-110 transition duration-150
                 bg-white cursor-pointer text-xl flex items-center justify-center rounded-md bottom-0 right-0"
              >
                <BsImageFill />
                <input
                  onChange={handleFileInputChange}
                  id="dropzone-file"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden"
                />
              </label>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <button
                onClick={handleUploadProfile}
                className="bg-main-color rounded-md  text-third-color px-3 py-2
          hover:bg-supper-main-color transition duration-150 hover:scale-105 active:ring-2 ring-main-color"
              >
                upload image
              </button>
            )}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-supper-main-color rounded-full p-2 text-white text-lg flex items-center justify-center">
                <BiSolidUser />
              </div>
              <span>{user.email}</span>
            </div>
          </section>
          <div className="w-full h-[1px] bg-supper-main-color my-5"></div>
          <div className="w-11/12 lg:w-5/12 flex flex-col gap-5">
            <TextField
              fullWidth
              onChange={handleChangeUserData}
              label="name"
              name="name"
              value={userData.name}
            />
            <MuiTelInput
              name="phone"
              required
              fullWidth
              onChange={handleChangePhone}
              value={userData.phone}
              id="phone"
              label="phone"
            />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <button
              onClick={handleSummitUpdateProfile}
              className="bg-main-color rounded-md  text-third-color px-3 py-2
          hover:bg-supper-main-color transition duration-150 hover:scale-105 active:ring-2 ring-main-color"
            >
              update profile
            </button>
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Setting;
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
