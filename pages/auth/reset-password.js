import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BiSolidUser } from "react-icons/bi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useState } from "react";
import { ConfirmResetPassword, ForgetPasswordAPI } from "@/services/auth";
import Swal from "sweetalert2";
import Loading from "@/components/status/loading";
import Head from "next/head";
import { useRouter } from "next/router";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://trekkingthailandtour.com/">
        TREKKING & ORGANIZE (THAILAND) CO., LTD.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
function ForgetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  console.log(error);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  //handle login locally
  const handleSubmit = async (e) => {
    try {
      setLoading(() => true);
      e.preventDefault();
      const res = await ConfirmResetPassword({
        resetToken: router.query.resetToken,
        password: input.password,
      });
      Swal.fire("Password has change", res, "success");
      setLoading(() => false);
      router.push({
        pathname: "/auth/sign-in",
      });
    } catch (err) {
      setLoading(() => false);
      console.log(err);
      Swal.fire(
        "error",
        err?.props?.response?.data?.message.toString(),
        "error"
      );
    }
  };
  return (
    <div className="bg-third-color ">
      <Head>
        <title>Reset password</title>
      </Head>
      <Navbar />
      <main>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs" className="h-screen">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="w-10 h-10 bg-main-color rounded-full text-third-color text-2xl flex items-center justify-center">
                <AiFillQuestionCircle />
              </div>
              <Typography component="h1" variant="h5">
                Reset password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="New password"
                  type="password"
                  name="password"
                  placeholder="type your password"
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                />
                {error.password && (
                  <span className=" right-0  text-xs  text-red-400 font-light">
                    {error.password}
                  </span>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Confirm password"
                  type="password"
                  name="confirmPassword"
                  placeholder="type your password"
                  value={input.confirmPassword}
                  onChange={onInputChange}
                  onBlur={validateInput}
                />
                {error.confirmPassword && (
                  <span className=" right-0  text-xs  text-red-400 font-light">
                    {error.confirmPassword}
                  </span>
                )}
                {loading ? (
                  <Loading />
                ) : !error.confirmPassword && !error.password ? (
                  <button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="bg-main-color w-full py-3 rounded-lg text-white hover:bg-supper-main-color my-5"
                  >
                    send request
                  </button>
                ) : (
                  <div
                    fullWidth
                    variant="contained"
                    className="bg-slate-500 flex items-center justify-center w-full py-3 rounded-lg text-white
                    my-5"
                  >
                    send request
                  </div>
                )}
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ForgetPassword;
