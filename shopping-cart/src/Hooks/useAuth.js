import { useContext, useState } from "react";
import instance from "../Store/AxiosInstance";
import counterContext from "./Context";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const { setUser, user } = useContext(counterContext);

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

  //to register a user
  async function registerUser({ username, email, password }) {
    // let isUserSignedUp = false;
    let body = {
      user: {
        username,
        email,
        password,
      },
    };
    try {
      const response = await instance.post(`users`, JSON.stringify(body));
      // console.log(response.data);
      // setUser({ ...response.data.user });
      localStorage.setItem("token", response.data.user.token);
      let userInfo = JSON.stringify(response.data.user);
      localStorage.setItem("user", userInfo);
      // isUserSignedUp = true;
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  // to login a user
  // async function loginUser({ email, password }) {
  //   // let isUserLoggedIn = false;
  //   // // let errorMsg="" ;
  //   let body = {
  //     user: {
  //       email,
  //       password,
  //     },
  //   };
  //   try {
  //     const response = await instance.post(`users/login`, JSON.stringify(body));
  //     // isUserLoggedIn = true;
  //     // setUser(response?.data?.user || {});
  //     localStorage.setItem("token", response.data.user.token);
  //     let userInfo = JSON.stringify(response.data.user);
  //     localStorage.setItem("user", userInfo);
  //     return response;
  //   } catch (error) {
  //     console.error(error.response.data.msg);
  //     // errorMsg=error.response.data.msg;
  //     // return errorMsg;
  //   }
  // }

  function logout() {
    localStorage.clear();
    setUser({ user: null });
    navigate("/");
  }

  //to edit user info
  async function updateUserInfo({ username, email, image }) {
    let isUserUpdated = false;
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
      isUserUpdated = true;
      return isUserUpdated;
    } catch (error) {
      console.error(error.response.data);
    }
  }
  return {
    user,
    logout,
    updateUserInfo,
    authorizeUser,
  };
}

export default useAuth;
