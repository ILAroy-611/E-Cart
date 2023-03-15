import { useState } from "react";
import instance from "../Store/AxiosInstance";

function useAuth() {
  const [user, setUser] = useState({});
  // const [name, setName] = useState("Ashish");

  async function registerUser({ username, email, password }) {
    let isUserSignedUp = false;
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
      setUser({ ...response.data.user });
      localStorage.setItem("token", response.data.user.token);
      let userInfo = JSON.stringify(response.data.user);
      localStorage.setItem("user", userInfo);
      isUserSignedUp = true;
      return isUserSignedUp;
    } catch (error) {
      console.error(error);
    }
  }

  async function loginUser({ email, password }) {
    let isUserLoggedIn = false;
    let body = {
      user: {
        email,
        password,
      },
    };
    try {
      const response = await instance.post(`users/login`, JSON.stringify(body));
      isUserLoggedIn = true;
      setUser(response?.data?.user || {});
      // console.log(user);
      // const dummyUser = {
      //   email: "ila007@gmail.com",
      //   password: "12345678",
      // };
      // setUser({...user,dummyUser});
      // console.log(user);
      // setName('Ila');
      // console.log('name',name);
      localStorage.setItem("token", response.data.user.token);
      let userInfo = JSON.stringify(response.data.user);
      localStorage.setItem("user", userInfo);
      // console.log(user)
      return isUserLoggedIn;
    } catch (error) {
      console.error(error);
    }
  }
  function logout() {
    localStorage.clear();
    setUser({ user: null });
  }
  return { registerUser, user, loginUser, logout };
}

export default useAuth;
