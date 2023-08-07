import axios from "axios";
import Error from "next/error";
import { parseCookies } from "nookies";

export async function CreatePayment({ people, price, name, images }) {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const payment = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/create-payment`,
      {
        people,
        price,
        name,
        images,
      },
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return payment.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function GetAllPayment({ page }) {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const payments = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/get-payments`,
      {
        params: {
          page: page,
        },
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return payments.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
