import { useContext, useState } from "react";
import instance from "../Store/AxiosInstance";
import counterContext from "./Context";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  const { setUser, user } = useContext(counterContext);

//to register/login a user
  async function authorizeUser({ body, url }) {
    try {
      const response = await instance.post(url, JSON.stringify(body));
      localStorage.setItem("token", response.data.user.token);
      let userInfo = JSON.stringify(response.data.user);
      localStorage.setItem("user", userInfo);
      return response;
    } catch (error) {
      console.log("auth error", error.response.data.msg);
    }
  }

//to logout a user
  function logout() {
    localStorage.clear();
    setUser({ user: null });
    navigate("/login");
  }

  //to edit user info
  async function updateUserInfo({ username, email, image }) {
    const body = {
      user: {
        username,
        email,
        image,
      },
    };
    try {
      const response = await instance.put(`user`, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      let userInfo = JSON.stringify(response.data.user);
      // console.log(userInfo)
      localStorage.setItem("user", userInfo);
      return response;
    } catch (error) {
      console.error('error in update user info',error.response.data);
    }
  }
  return {
    logout,
    updateUserInfo,
    authorizeUser,
  };
}

export default useAuth;
