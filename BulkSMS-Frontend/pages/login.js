import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import * as yup from "yup";
import frame from "../public/images/login/Frame2.svg";
import frame2 from "../public/images/login/Frame3.svg";
import loginImg from "../public/images/login/login-illustration.svg";
import line from "../public/images/login/or.svg";
import Footer from "../src/Components/Shared/Footer/Footer";
import useAuth from "../src/Hooks/useAuth";
import withAuth from "./HOC/withAuth";
import Navbar from "/src/Components/Shared/Navbar/Navbar";

const Login = (props) => {
  const [code, setCode] = useState("");
  const [loginData, setLoginData] = useState({});
  const {
    user,
    setUser,
    setAuthToken,
    setRefreshToken,
    setIsLoading,
    isLoading,
    loginWithGoogle,
    loginUser,
    setAuthError,
    authError,
  } = useAuth();

  const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  // const passwordRegExp=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,25}$/;
  let schema = yup
    .object()
    .shape({
      userEmail: yup
        .string()
        .required("Email is required")
        .matches(emailRegExp, "Email is not valid."),
      userPassword: yup
        .string()
        .required("Password is required")
        .min(8, "Password must contain at least 8 characters or above")
        .max(25, "Password should be maximum 25 characters long"),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const history = useRouter();
  const location = history.pathname;

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const onSubmit = (e) => {
    loginUser(loginData.userEmail, loginData.userPassword, location, history);
    // e.preventDefault();
  };

  //google
  const responseSuccessGoogle = (res) => {
    loginWithGoogle(res, location, history);
  };

  //linkedin
  const { linkedInLogin } = useLinkedIn({
    clientId: `${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}`,
    redirectUri: `${
      typeof window === "object" && window.location.origin
    }/auth/linkedin/callback`,
    onSuccess: (code) => {
      console.log(code)
      setIsLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/linkedin/callback?code=${code}`
        )
        .then((res) => {
          console.log(res.data);
          const linkedinResponse = res.data;
          if (linkedinResponse.authToken && linkedinResponse.refreshToken) {
            window.localStorage.setItem(
              "authToken",
              JSON.stringify(linkedinResponse.authToken)
            );
            window.localStorage.setItem(
              "refreshToken",
              JSON.stringify(linkedinResponse.refreshToken)
            );
            setAuthToken(linkedinResponse.authToken);
            setRefreshToken(linkedinResponse.refreshToken);

            axios
              .get(`${process.env.NEXT_PUBLIC_BASE_URL}/userProfile`, {
                headers: {
                  "auth-token": linkedinResponse.authToken,
                },
              })
              .then((res) => {
                console.log(res);
                const linkedinUserResponse = res.data.user;
                console.log(linkedinUserResponse);
                if (linkedinUserResponse) {
                  window.localStorage.setItem(
                    "user",
                    JSON.stringify(linkedinUserResponse)
                  );
                  const linkedinUserData = window.localStorage.getItem("user");
                  const linkedinInitialData = JSON.parse(linkedinUserData);
                  setUser(linkedinInitialData);
                  const destination =
                    location?.state?.from || "/masterDashboard";
                  history.replace(destination);
                  setAuthError("");
                } else {
                  setAuthSuccess("");
                  setAuthError(res.data.message);
                }
              })
              .catch(function (error) {
                if (error.response) {
                  setAuthSuccess("");
                  setAuthError(error.response.data.errorMessage);
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log("Error", error.message);
                }
                console.log(error.config);
              })
              .finally(() => setIsLoading(false));
          }
        })
        .catch(function (error) {
          if (error.response) {
            setAuthSuccess("");
            setAuthError(error.response.data.errorMessage);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        })
        .finally(() => setIsLoading(false));
    },
    scope: "r_emailaddress r_liteprofile",
    onError: (error) => {
      console.log(error);
      setCode("");
      console.log(error.errorMessage);
    },
  });

  return (
    <>
      <Navbar></Navbar>
      <section className="login-section ">
        <div className="mt-5 pt-5 card-div container pb-5 mb-5">
          <div className="wrapper ">
            <div className="row pt-2 pb-3  mt-0 mb-4 pt-lg-5 pb-lg-5 mt-lg-4  g-0">
              <div className="mt-3 col-12 col-lg-6">
                <div className="ps-lg-3 mx-3 mx-lg-0">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-1 px-md-3 mx-md-1 ps-lg-2"
                  >
                    <h3 className="text-center pb-2">Login to your account</h3>
                    {isLoading && (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    {authError && (
                      <div className="alert alert-danger" role="alert">
                        {authError}
                      </div>
                    )}
                    <div className=" ps-1">
                      <label htmlFor="userEmail" className="form-label">
                        Write your email
                      </label>
                      <input
                        type="email"
                        placeholder="email"
                        name="userEmail"
                        id="userEmail"
                        className="col-12 rounded-pill"
                        {...register("userEmail")}
                        onBlur={handleOnChange}
                      />
                      {errors.userEmail?.message && (
                        <p className="count-text pt-2">
                          {errors.userEmail?.message}
                        </p>
                      )}

                      <label htmlFor="userPassword" className="form-label">
                        Type your password
                      </label>
                      <input
                        type="password"
                        name="userPassword"
                        placeholder="password"
                        id="userPassword"
                        className="col-12 rounded-pill"
                        {...register("userPassword")}
                        onBlur={handleOnChange}
                      />
                      {errors.userPassword?.message && (
                        <p className="count-text pt-2">
                          {errors.userPassword?.message}
                        </p>
                      )}

                      <div className="d-md-flex text-center text-md-start justify-content-between">
                        <button className="login-btn rounded-pill   bg-primary text-white border-0 mt-2 px-4">
                          Login
                        </button>
                        <p className="mt-3 ps-lg-2">
                          Don’t have an account?{" "}
                          <Link href="/register" as="/register" passHref>
                            <a className="fw-normal text-secondary border-bottom border-secondary">
                              Register Here
                            </a>
                          </Link>
                        </p>
                        <p className="mt-3  ps-lg-2">
                          <Link
                            href="/forgetPassword"
                            as="/forgetPassword"
                            passHref
                          >
                            <a>Forget Password?</a>
                          </Link>
                        </p>
                      </div>

                      <div className=" or-text d-flex justify-content-center">
                        <Image src={line} className="col-6 " alt="" />
                        <p className="ms-2 me-2"> Or </p>
                        <Image src={line} className="col-6" alt="" />
                      </div>

                      <div className="mx-4 mx-md-0 d-md-flex justify-content-between">
                        <GoogleLogin
                          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                          render={(renderProps) => (
                            <div
                              onClick={renderProps.onClick}
                              className="social-btn btn col-12 col-md-6 d-flex justify-content-center me-2"
                            >
                              <Image src={frame} alt="" />
                            </div>
                          )}
                          buttonText="Login"
                          onSuccess={responseSuccessGoogle}
                          cookiePolicy={"single_host_origin"}
                        />

                        <div
                          onClick={linkedInLogin}
                          className="social-btn btn col-12 col-md-6 d-flex justify-content-center ms-md-1"
                        >
                          <Image src={frame2} alt="" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className=" col-12 col-lg-6 d-none d-lg-block mt-2  pb-2  ">
                <div className=" h-100 mx-2 px-4">
                  <Image src={loginImg} className="h-100 img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export async function getServerSideProps(context) {
  console.log(context.params);
  return {
    props: {
      ...context.params,
    },
  };
}

export default withAuth(Login, {
  isProtectedRoute: false,
  redirectIfNotAuthenticated: "/login",
  redirectIfAuthenticated: "/masterDashboard",
});

//export default Login;
