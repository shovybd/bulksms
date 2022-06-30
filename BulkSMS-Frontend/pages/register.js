import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import * as yup from "yup";
import frame from "../public/images/login/Frame2.svg";
import frame2 from "../public/images/login/Frame3.svg";
import line from "../public/images/login/or.svg";
import registerImg from "../public/images/registration/registration-illustration.svg";
import Footer from "../src/Components/Shared/Footer/Footer";
import useAuth from "../src/Hooks/useAuth";
import withAuth from "./HOC/withAuth";
import Navbar from "/src/Components/Shared/Navbar/Navbar";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const recaptchaRef = useRef();
  const [valid, setValid] = useState(false);
  const [recapchaError, setRecapchaError] = useState();

  const {
    user,
    setIsLoading,
    isLoading,
    setUser,
    authSuccess,
    registerUser,
    setAuthError,
    authError,
    loginWithGoogle,
    setAuthToken,
    setRefreshToken,
  } = useAuth();
  const history = useRouter();

  const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  // const passwordRegExp=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,25}$/;
  let schema = yup
    .object()
    .shape({
      userFullName: yup
        .string()
        .required("Name is required")
        .min(3, "Name should be at least 3 characters long")
        .max(255, "Name must be 255 characters long maximum"),
      userEmail: yup
        .string()
        .required("Email is required")
        .matches(emailRegExp, "Email is not valid."),
      userPassword1: yup
        .string()
        .required("Password is required")
        .min(8, "Password must contain at least 8 characters or above")
        .max(25, "Password should be maximum 25 characters long"),
      userPassword2: yup
        .string()
        .required("Password is required")
        .min(8, "Password must contain at least 8 characters or above")
        .max(25, "Password should be maximum 25 characters long")
        .oneOf(
          [yup.ref("userPassword1")],
          "Password did not matched.Please try again!"
        ),
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

  const handleOnBlur = (e) => {
    e.preventDefault();
    const field = e.target.name;
    const value = e.target.value;
    const recaptchaToken = recaptchaRef.current.getValue();
    console.log(recaptchaRef.current.props.grecaptcha.getResponse().length);
    setRecapchaError(
      recaptchaRef.current.props.grecaptcha.getResponse().length
    );
    console.log("recaptchaToken", recaptchaToken);
    const newLoginData = { ...loginData, recaptchaToken };
    (newLoginData[field] = value), recaptchaToken;
    setLoginData(newLoginData);
  };

  const onSubmit = (e) => {
    registerUser(
      loginData.userFullName,
      loginData.userEmail,
      loginData.userPassword1,
      loginData.userPassword2,
      loginData.recaptchaToken,
      history
    );
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
      setIsLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/linkedin/callback?code=${code}`
        )
        .then((res) => {
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
      <section className="login-section">
        <div className="mt-5 pt-5 card-div container pb-4 mb-5">
          <div className="wrapper">
            <div className="row pt-4 pb-4 mt-5 mb-4  ">
              <div className="col-12 col-lg-6  mb-4 pb-2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-lg-1 container"
                >
                  <h3 className="text-center pt-2 mt-1 pb-3 mb-2">
                    Sign into your account
                  </h3>

                  {isLoading && (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {authSuccess && (
                    <div className="alert alert-success" role="alert">
                      {authSuccess}
                    </div>
                  )}
                  {authError && (
                    <div className="alert alert-danger" role="alert">
                      {authError}
                    </div>
                  )}

                  <label htmlFor="userFullName" className="form-label">
                    Write your name
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    name="userFullName"
                    id="userFullName"
                    className="col-12 rounded-pill"
                    {...register("userFullName")}
                    onBlur={handleOnBlur}
                  />
                  {errors.userFullName?.message && (
                    <p className="count-text pt-2">
                      {errors.userFullName?.message}
                    </p>
                  )}

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
                    onBlur={handleOnBlur}
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
                    placeholder="password"
                    name="userPassword1"
                    id="userPassword1"
                    className="col-12 rounded-pill"
                    {...register("userPassword1")}
                    onBlur={handleOnBlur}
                  />
                  {errors.userPassword1?.message && (
                    <p className="count-text pt-2">
                      {errors.userPassword1?.message}
                    </p>
                  )}

                  <label htmlFor="userPassword" className="form-label">
                    Type your confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="confirm passsword"
                    name="userPassword2"
                    id="userPassword2"
                    className="col-12 rounded-pill"
                    {...register("userPassword2")}
                    onBlur={handleOnBlur}
                  />
                  {errors.userPassword2?.message && (
                    <p className="count-text pt-2">
                      {errors.userPassword2?.message}
                    </p>
                  )}

                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="normal"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onBlur={handleOnBlur}
                    required
                  />
                  {recapchaError === 0 && (
                    <p className="count-text pt-2">
                      You have to check recaptcha
                    </p>
                  )}
                  <div className="d-md-flex text-center text-md-start justify-content-between">
                    <button className="login-btn rounded-pill   bg-primary text-white border-0 mt-2 ">
                      {" "}
                      Register{" "}
                    </button>
                    <p className="mt-3 ms-lg-2 ">
                      Already have an account?{" "}
                      <Link href="/login" as="/login" passHref>
                        <a className="fw-normal text-secondary border-bottom border-secondary">
                          Go to login
                        </a>
                      </Link>
                    </p>
                  </div>

                  <div className=" or-text d-flex justify-content-center">
                    <Image src={line} className="col-6 " alt="" />
                    <p className="ms-2 me-2 "> Or </p>
                    <Image src={line} className="col-6" alt="" />
                  </div>

                  <div className="mx-4 mx-md-0 d-md-flex justify-content-between mb-1">
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
                </form>
              </div>
              <div className="col-12 col-lg-6 d-none d-lg-block ">
                <div className="ms-lg-5 mt-4 pt-4 me-2">
                  <Image src={registerImg} className="img-fluid w-100" alt="" />
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

export default withAuth(Register, {
  isProtectedRoute: false,
  redirectIfNotAuthenticated: "/login",
  redirectIfAuthenticated: "/masterDashboard",
});

//export default Register;
