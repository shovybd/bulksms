import axios from "axios";
import React from "react";
import useAuth from "../src/Hooks/useAuth";
import withAuth from "./HOC/withAuth";
import Footer from "/src/Components/Shared/Footer/Footer";
import Navbar from "/src/Components/Shared/Navbar/Navbar";

const ForgetPassword = (data) => {
  const {
    setIsLoading,
    isLoading,
    authSuccess,
    authError,
    setAuthError,
    setAuthSuccess,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userEmail } = e.target.elements;

    let details = {
      userEmail: userEmail.value,
    };

    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/forgetPasswordResetLink`,
          details,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const resetPasswordResponse = res.data;
          if (resetPasswordResponse.errorMessage) {
            setAuthSuccess("");
            setAuthError(resetPasswordResponse.errorMessage);
          } else if (resetPasswordResponse.resetPasswordMessage) {
            setAuthError("");
            setAuthSuccess(resetPasswordResponse.resetPasswordMessage);
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
    };

    fetchData().catch(console.error);
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="forget-section">
        <div className="my-5 py-5 container card-div ">
          <div className="wrapper">
            <div className="py-4 px-3 text-primary ">
              <form onSubmit={handleSubmit} className="container ">
                <h3 className="text-center pb-3">Please enter your email</h3>

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

                <label htmlFor="userEmail" className="form-label">
                  Write your email
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="userEmail"
                  id="userEmail"
                  className="col-12 rounded-pill"
                  required
                />

                <div className="d-md-flex text-center text-md-start justify-content-between">
                  <button
                    type="submit"
                    className="login-btn rounded-pill   bg-primary text-white border-0 mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
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
  // console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return {
    props: {
      ...context.params,
    },
    // will be passed to the page component as props
  };
}


export default withAuth(ForgetPassword, {
  isProtectedRoute: false,
  redirectIfNotAuthenticated: '/login',
  redirectIfAuthenticated: '/masterDashboard',
});

//export default ForgetPassword;
