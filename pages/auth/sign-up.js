import * as React from "react";
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
import Navbar from "@/components/navbar/navbar";
import { BiSolidUser } from "react-icons/bi";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { SignUpAPI } from "@/services/auth";
import Swal from "sweetalert2";
import Loading from "@/components/status/loading";
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
function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signUpdata, setSignUpdata] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAcceptMarketing: true,
  });
  const handleChangeCheckBox = (event) => {
    setSignUpdata((prev) => {
      return {
        ...prev,
        isAcceptMarketing: event.target.checked,
      };
    });
  };
  const handleChangeOnSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangePhone = (newValue) => {
    setSignUpdata((prev) => {
      return {
        ...prev,
        phone: newValue,
      };
    });
  };

  const handleSubmit = async (event) => {
    try {
      setLoading(() => true);
      event.preventDefault();
      const response = await SignUpAPI({
        email: signUpdata.email,
        phone: signUpdata.phone,
        name: signUpdata.name,
        isAcceptMarketingEmail: signUpdata.isAcceptMarketing,
        password: signUpdata.password,
      });
      setLoading(() => false);
      Swal.fire("SUCCESS", "Sign up has completed successfully", "success");
      router.push({
        pathname: "/auth/sign-in",
      });
    } catch (err) {
      Swal.fire("ERROR", err.props.response.data.message.toString(), "error");
      setLoading(() => false);
      console.log(err);
    }
  };

  return (
    <div className="bg-white h-screen">
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <Container component="main" maxWidth="xs">
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
              <BiSolidUser />
            </div>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    onChange={handleChangeOnSignUpData}
                    value={signUpdata.name}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MuiTelInput
                    name="phone"
                    required
                    fullWidth
                    onChange={handleChangePhone}
                    id="phone"
                    value={signUpdata.phone}
                    label="phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    onChange={handleChangeOnSignUpData}
                    value={signUpdata.email}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChangeOnSignUpData}
                    value={signUpdata.password}
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChangeCheckBox}
                        checked={signUpdata.isAcceptMarketing}
                        color="primary"
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              {loading ? (
                <div className="w-full justify-center flex">
                  <Loading />
                </div>
              ) : (
                <button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="bg-main-color w-full py-3 rounded-lg text-white hover:bg-supper-main-color my-5"
                >
                  Sign Up
                </button>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/auth/sign-in" variant="body2">
                    <span className="text-supper-main-color ">
                      Already have an account? Sign in
                    </span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SignUp;
