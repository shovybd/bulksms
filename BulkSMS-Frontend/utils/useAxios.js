import axios from "axios";
import React from "react";

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return axiosInstance
};

export default useAxios;
