import { useState } from "react";
import instance from "../Store/AxiosInstance";

//custom hooks to add/get/edit/delete address of the user.

function useAddress() {
  const [address, setAddress] = useState([]);

  //to get user's all addresses
  async function fetchUserAddress() {
    let addressFetched = false;
    try {
      const response = await instance.get(`user/address`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      addressFetched = true;
      //   console.log("user address", response.data.address, response.status);
      setAddress(response.data.address);
    } catch (error) {
      console.log(error);
    }
    return addressFetched;
  }

  //to add a new address-
  async function addAddress(userAddres) {
    // console.log(userAddres);
    let newAddressAdded = false;
    let body = {
      address: {
        address: userAddres,
      },
    };
    try {
      const response = await instance.post(
        `user/address`,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      newAddressAdded = true;
    } catch (error) {
      console.log(error);
    }
    return newAddressAdded;
  }

  //to delete a address-
  async function deleteAddress(addressID) {
    // console.log(addressID);
    console.log(localStorage.getItem("token"));
    let body={
        address: {
          id: `${addressID}`,
        },
      };
    try {
      const response = await instance.delete(
        `user/address`,
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
          data:JSON.stringify(body)
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return { addAddress, fetchUserAddress, address, deleteAddress };
}

export default useAddress;
