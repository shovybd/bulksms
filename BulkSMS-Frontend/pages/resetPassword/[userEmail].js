import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import swal from "sweetalert";
import Footer from "../../src/Components/Shared/Footer/Footer";
import useAuth from "../../src/Hooks/useAuth";
import withAuth from "../HOC/withAuth";
import Navbar from "/src/Components/Shared/Navbar/Navbar";

const ResetPassword = (data) => {
  const {
    authSuccess,
    authError,
    setAuthError,
    setAuthSuccess,
    setIsLoading,
    isLoading,
  } = useAuth();
  const router = useRouter();
  const { userEmail } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userPassword1, userPassword2 } = e.target.elements;

    let details = {
      userPassword1: userPassword1.value,
      userPassword2: userPassword2.value,
    };

    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/forgetPassword?${userEmail}`,
          details,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        )
        .then((res) => {
          console.log(res);
          const response = res.data;
          if (response.message) {
            setAuthSuccess("");
            setAuthError(response.message);
          } else if (response.updateSuccessMessage) {
            setAuthError("");
            swal({
              title: "Wow!",
              text: `${response.updateSuccessMessage}`,
              icon: "warning",
              timer: 5000,
            });
            router.replace("/login");
          }
        })
        .catch(function (error) {
          if (error.response) {
            setAuthSuccess("");
            setAuthError(error.response.data.message);
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
                <h3 className="text-center pb-3">Reset your password</h3>

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

                <label htmlFor="userPassword1" className="form-label">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="new password"
                  name="userPassword1"
                  id="userPassword1"
                  className="col-12 rounded-pill"
                  required
                />
                <label htmlFor="userPassword2" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  name="userPassword2"
                  id="userPassword2"
                  className="col-12 rounded-pill"
                  required
                />

                <div className="d-md-flex text-center text-md-start justify-content-between">
                  <button className="btn btn-1  rounded-pill   bg-primary text-white border-0 mt-2">
                    Reset Passowrd
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
  return {
    props: {
      ...context.params,
    },
  };
}

export default withAuth(ResetPassword, {
  isProtectedRoute: false,
  redirectIfNotAuthenticated: '/login',
  redirectIfAuthenticated: '/masterDashboard',
});
//export default ResetPassword;
