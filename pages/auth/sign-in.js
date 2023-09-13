import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BiSolidUser } from "react-icons/bi";
import Navbar from "@/components/navbar/navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import { SignInAPI } from "@/services/auth";
import Loading from "@/components/status/loading";
import Swal from "sweetalert2";
import Head from "next/head";

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

function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signIndata, setSignIndata] = useState({
    email: "",
    password: "",
  });

  const handleChangeOnSignInData = (e) => {
    const { name, value } = e.target;
    setSignIndata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    try {
      setLoading(() => true);
      event.preventDefault();
      const response = await SignInAPI({
        email: signIndata.email,
        password: signIndata.password,
      });
      Swal.fire("SUCCESS", "Sign in has completed successfully", "success");
      router.push(`/?access_token=${response.access_token}`, undefined, {
        shallow: true,
      });
      setLoading(() => false);
    } catch (err) {
      Swal.fire(
        "ERROR",
        err?.props?.response?.data?.message?.toString(),
        "error"
      );
      setLoading(() => false);
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>sign in</title>
      </Head>
      <Navbar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="w-10 h-10 bg-main-color rounded-full text-third-color text-2xl flex items-center justify-center">
              <BiSolidUser />
            </div>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={handleChangeOnSignInData}
                value={signIndata.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChangeOnSignInData}
                value={signIndata.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {loading ? (
                <div className="w-full justify-center flex my-5">
                  <Loading />
                </div>
              ) : (
                <button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="bg-main-color w-full py-3 rounded-lg text-white hover:bg-supper-main-color my-5"
                >
                  Sign In
                </button>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/forget-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
