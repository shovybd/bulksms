import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../../src/Components/Shared/Footer/Footer";
import useAuth from "../../../src/Hooks/useAuth";
import withAuth from "../../HOC/withAuth";
import Navbar from "/src/Components/Shared/Navbar/Navbar";

const VerifyEmail = (data) => {
  const router = useRouter();
  const {
    setIsLoading,
    isLoading,
    setAuthSuccess,
    authSuccess,
    setAuthError,
    authError,
  } = useAuth();
  const { userEmail, userRandomToken } = data;
  console.log(data);
  console.log(userEmail);
  console.log(userRandomToken);
  const [verified, setVerified] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/registration/verify/${userEmail}/${userRandomToken}`
        )
        .then((res) => {
          console.log(res);
          setVerified(res.data);
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
  }, [isLoading]);

  return (
    <>
      <Navbar></Navbar>
      <section className="forget-section">
        <div className="my-5 py-5 container card-div ">
          <div className="wrapper">
            <div className="py-4 px-3 text-primary ">
              <form className="container text-center">
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

                <h3 className="pb-3">{verified.verifiedMessage} </h3>
                <div className="text-center">
                  <Link href="/login" as="/login" passHref>
                    <button className="btn btn-1  rounded-pill   bg-primary text-white border-0 mt-2">
                      Go to website
                    </button>
                  </Link>
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


export default withAuth(VerifyEmail, {
  isProtectedRoute: false,
  redirectIfNotAuthenticated: '/login',
  redirectIfAuthenticated: '/masterDashboard',
});

//export default VerifyEmail;
