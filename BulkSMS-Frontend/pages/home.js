import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../src/Components/Shared/Footer/Footer";
import Navbar from "../src/Components/Shared/Navbar/Navbar";
import useAuth from "../src/Hooks/useAuth";

const Home = (data) => {
  const { user, authToken,isLoding } = useAuth();
  const [campaign, setCampaign] = useState({});

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const { userEmail } = e.target.elements;
  //     //console.log(userEmail);

  //     let details = {
  //       userEmail: userEmail.value,
  //     };

  // // get the data from the api
  // const res = await axios.post(
  //   "http://192.168.43.237:5000/campaign/create", details, {
  //         headers: {
  //             "Content-Type": "application/json;charset=utf-8",
  //             "auth-token": token
  //         }

  //   })
  //   .then(res=>{
  //    // console.log(res.data)
  //     console.log(res)
  //     // if (res.data.resetPasswordErrorMessage) {
  //     //               setAuthSuccess('');
  //     //               setAuthError(res.data.resetPasswordErrorMessage)
  //     //           }
  //     // else if(res.data.resetPasswordMessage){
  //     //               setAuthError('');
  //     //               setAuthSuccess(res.data.resetPasswordMessage)
  //     // }

  //   })

  // };

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaign/show`, {
        headers: {
          "auth-token": authToken,
        },
      });
      console.log(res);
      // set state with the result
      console.log(res.data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [isLoding]);

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-5 pt-5 ">
        <p> hello from home Page </p>
        {user.userEmail && <p> email: {user.userEmail}</p>}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
