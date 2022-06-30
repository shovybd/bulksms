export const ErrorHandler = async (
  error,
  updateToken,
  setAuthError,
  setAuthSuccess,
  logOut,
//   onSubmit(data)
) => {
  if (!error.response) {
    setAuthSuccess("");
    setAuthError("NETWOKR ERROR !!!");
  }
  if (error.response) {
    console.log(error.response);
    setAuthSuccess("");
    setAuthError(error.response?.data?.errorMessage);
    if (error.response.data.invalidAuthTokenMessage) {
      await updateToken().then(async (res) => {
        await onSubmit(data);
      });
    } else if (error.response.data.invalidRefreshTokenMessage) {
      setAuthSuccess("");
      setAuthError(error.response.data.invalidRefreshTokenMessage);
      logOut();
    }
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  setIsLoading(false);
  console.log(error.config);
};
