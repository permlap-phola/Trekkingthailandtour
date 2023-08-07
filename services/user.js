import axios from "axios";
import Error from "next/error";
import { parseCookies } from "nookies";

export async function GetUser() {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    if (!access_token) {
      throw new Error("Unauthorized");
    }
    const user = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return user.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error(err);
    }
  }
}

export async function GetUserCookie({ access_token }) {
  try {
    const user = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return user;
  } catch (err) {
    throw new Error(err);
  }
}
