import axios from "axios";
import Error from "next/error";

export async function SignUpAPI({
  email,
  isAcceptMarketingEmail,
  password,
  name,
  phone,
}) {
  try {
    const signUp = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-up`,
      {
        email,
        isAcceptMarketingEmail,
        password,
        name,
        phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return signUp.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function SignInAPI({ email, password }) {
  try {
    const signIn = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-in`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return signIn.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
