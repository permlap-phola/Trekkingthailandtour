import axios from "axios";
import Error from "next/error";
import { parseCookies } from "nookies";
export async function GetAllPaymentFromUser({ page }) {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const payments = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/payments/get-all`,
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
