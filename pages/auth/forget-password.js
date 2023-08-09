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
import { ForgetPasswordAPI } from "@/services/auth";
import Swal from "sweetalert2";
import Loading from "@/components/status/loading";
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
  const [email, setEmail] = useState();
  const [isloading, setIsloading] = useState(false);
  const [wait, setWait] = useState(false);
  const [secound, setSecound] = useState(0);
  const handleSubmit = async (e) => {
    try {
      setIsloading(() => true);
      e.preventDefault();
      const res = await ForgetPasswordAPI({ email });
      Swal.fire("Email is sent", res, "success");
      setIsloading(() => false);
      setWait(() => true);
      hanldeTimmingWait();
    } catch (err) {
      setIsloading(() => false);
      console.log(err);
      Swal.fire(
        "error",
        err?.props?.response?.data?.message.toString(),
        "error"
      );
    }
  };

  const hanldeTimmingWait = () => {
    setSecound(20); // Set the initial value of the countdown timer
    setWait(() => true);
    const timer = setInterval(() => {
      setSecound((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      if (secound === 0) {
        setWait(() => false);
      }
      setWait(false);
      // Perform your action here after the wait duration
      // For example, you can set the `wait` state to false to indicate that the wait is over
    }, 20000); // Wait for 10 seconds (1000 milliseconds * 10)

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  };
  return (
    <div className="bg-third-color ">
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
                Forget password?
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
                  label="Email Address"
                  onChange={(e) => setEmail(() => e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                {isloading ? (
                  <Loading />
                ) : wait ? (
                  <div
                    className="w-max p-1 bg-gray-500 rounded-xl 
         text-white font-semibold text-lg px-6"
                  >
                    wait {secound}
                  </div>
                ) : (
                  <button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="bg-main-color w-full py-3 rounded-lg text-white hover:bg-supper-main-color my-5"
                  >
                    send request
                  </button>
                )}

                {wait && <span>Please open your email</span>}
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
