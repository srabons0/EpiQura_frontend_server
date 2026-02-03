import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";

const axiosSecure = axios.create({
  baseURL: "https://epiqura-backend-server.onrender.com",
});
const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;

        if (status === 401) {
          signOutUser().then(() => navigate("/login"));
        }

        if (status === 403) {
          navigate("/forbidden");
        }

        return Promise.reject(error);
      }
    );

    // CLEANUP (VERY IMPORTANT)
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [navigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
