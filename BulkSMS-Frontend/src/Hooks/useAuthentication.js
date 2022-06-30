import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useStateRef from "react-usestateref";
// import useState from 'react-usestateref';

const useAuthentication = () => {
  let localUserState = null;
  if (typeof localStorage !== "undefined" && localStorage.getItem("user"))
    try {
      localUserState = JSON.parse(localStorage.getItem("user") || "");
    } catch (error) {
      console.error("Not a JSON response");
    }

  let localAuthTokenState = null;
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("authToken")
  ) {
    localAuthTokenState = JSON.parse(localStorage.getItem("authToken") || "");
  }
  let localRefreshStateToken = null;
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("refreshToken")
  ) {
    localRefreshStateToken = JSON.parse(
      localStorage.getItem("refreshToken") || ""
    );
  }

  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const history = useRouter();

  const location = history.pathname;
  console.log(location);
  //const [admin, setAdmin] = useState(false);
  //const [authToken, setAuthToken] = useState(localAuthTokenState || "");
  const [authToken, setAuthToken, authTokenRef] = useStateRef(
    localAuthTokenState || ""
  );

  const [refreshToken, setRefreshToken] = useState(
    localRefreshStateToken || ""
  );
  const [user, setUser] = useState(localUserState || {});
  const [isLoading, setIsLoading] = useState(false);

  //Register User
  const registerUser = async (
    userFullName,
    userEmail,
    userPassword1,
    userPassword2,
    recaptchaToken,
    history
  ) => {
    setIsLoading(true);
    const userRegisterDetails = {
      userFullName,
      userEmail,
      userPassword1,
      userPassword2,
      recaptchaToken,
    };

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/registration`,
        userRegisterDetails,
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const registerUserResponse = res.data;
        if (registerUserResponse.userRegisterSuccessMessage) {
          setAuthError("");
          setAuthSuccess(registerUserResponse.userRegisterSuccessMessage);
        } else {
          setAuthSuccess("");
          setAuthError(registerUserResponse.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          setAuthSuccess("");
          setAuthError(error.response.data.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  //Login User
  const loginUser = async (userEmail, userPassword, location, history) => {
    setIsLoading(true);
    const userDetails = { userEmail, userPassword };
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, userDetails, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        const response = res.data;
        if (response.authToken && response.refreshToken) {
          window.localStorage.setItem(
            "authToken",
            JSON.stringify(response.authToken)
          );
          window.localStorage.setItem(
            "refreshToken",
            JSON.stringify(response.refreshToken)
          );
          setAuthToken(response.authToken);
          console.log(authToken);
          setRefreshToken(response.refreshToken);

          axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/userProfile`, {
              headers: {
                "auth-token": response.authToken,
              },
            })
            .then((res) => {
              console.log(res);
              const userResponse = res.data.user;
              console.log(userResponse);
              if (userResponse) {
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(userResponse)
                );
                const userData = window.localStorage.getItem("user");
                const initial = JSON.parse(userData);
                setUser(initial);
                const destination = location?.state?.from || "/masterDashboard";
                history.push(destination);
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
        if (!error.response) {
          setAuthSuccess("");
          setAuthError("NETWOKR ERROR !!!");
        }
        if (error.response) {
          console.log(error.response);
          setAuthSuccess("");
          setAuthError(error.response.data.errorMessage);
          // setAuthError(error.response.data.invalidAuthTokenMessage);
          if (error.response.data.invalidAuthTokenMessage) {
            logOut();
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      })
      .finally(() => setIsLoading(false));
  };

  //google login
  const loginWithGoogle = async (res, location, history) => {
    setIsLoading(true);
    const data = { tokenId: res.tokenId };
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/googleLogin`, data)
      .then((res) => {
        //console.log(res);
        let googleResponse = res.data;
        if (googleResponse.authToken && googleResponse.refreshToken) {
          window.localStorage.setItem(
            "authToken",
            JSON.stringify(googleResponse.authToken)
          );
          window.localStorage.setItem(
            "refreshToken",
            JSON.stringify(googleResponse.refreshToken)
          );
          setAuthToken(googleResponse.authToken);
          setRefreshToken(googleResponse.refreshToken);

          axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/userProfile`, {
              headers: {
                "auth-token": googleResponse.authToken,
              },
            })
            .then((res) => {
              console.log(res);
              const googleUserResponse = res.data.user;
              console.log(googleUserResponse);
              if (googleUserResponse) {
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(googleUserResponse)
                );
                const googleUserData = window.localStorage.getItem("user");
                const googleInitialData = JSON.parse(googleUserData);
                setUser(googleInitialData);
                const destination = location?.state?.from || "/masterDashboard";
                history.replace(destination);
                setAuthError("");
              } else {
                setAuthSuccess("");
                setAuthError(res.data.message);
              }
            });
        }
      })
      .catch(function (error) {
        if (!error.response) {
          setAuthSuccess("");
          setAuthError("NETWOKR ERROR !!!");
        }
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

  let updateToken = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/refreshToken`, {
        headers: {
          "refresh-token": refreshToken,
        },
      })
      .then((res) => {
        const dataResponse = res.data;
        if (dataResponse.authToken) {
          window.localStorage.setItem(
            "authToken",
            JSON.stringify(dataResponse.authToken)
          );
          setAuthToken(dataResponse.authToken);
        } else if (dataResponse.userRefreshTokenErrorMessage) {
          logOut();
        }

        if (isLoading) {
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        if (!error.response) {
          setAuthSuccess("");
          setAuthError("NETWOKR ERROR !!!");
        }
        if (error.response) {
          setAuthSuccess("");
          setAuthError(error.response.data.errorMessage);
          if (error.response.data.invalidRefreshTokenMessage) {
            setAuthError(error.response.data.invalidRefreshTokenMessage);
            logOut();
          }
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      })
      .finally(() => setIsLoading(false));
  };

  const logOut = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`, {
        headers: {
          "refresh-token": refreshToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.userLogoutMessage) {
          setUser("");
          localStorage.clear();
          history.push("/login");
        }
      })
      .catch((error) => {
        if (!error.response) {
          setAuthSuccess("");
          setAuthError("NETWOKR ERROR !!!");
        }
        if (error.response) {
          setAuthSuccess("");
          setAuthError(error.response.data.errorMessage);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    user,
    setUser,
    loginWithGoogle,
    setIsLoading,
    // admin,
    authToken,
    authTokenRef,
    setAuthToken,
    setRefreshToken,
    refreshToken,
    registerUser,
    loginUser,
    setAuthSuccess,
    logOut,
    updateToken,
    setAuthError,
    authError,
    authSuccess,
    isLoading,
    history,
  };
};

export async function getServerSideProps(context) {
  //console.log(context.params);
  console.log(context.req.headers.referer);

  return {
    props: {
      ...context.params,
    },
  };
}

export default useAuthentication;
