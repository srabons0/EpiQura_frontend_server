import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";

const axiosSecure = axios.create({
  baseURL: "https://epi-qura-backend-server-red.vercel.app",
});
const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
      async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken(); 
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; 
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        signOutUser()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
