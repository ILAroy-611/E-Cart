import { useState } from "react";
import instance from "../Store/AxiosInstance";

//custom hooks to add/get/edit/delete address of the user.

function useAddress() {
  const [loading, setLoading] = useState(true);

  //to get user's all addresses
  async function fetchUserAddress() {
    try {
      const response = await instance.get(`user/address`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return response;
      // setAddress(response.data.address);
    } catch (error) {
      console.log(error);
    }
  }

  //to add/edit user's address-
  async function addOrEditAddress({ body, method }) {
    try {
      const response = await instance[method](
        `user/address`,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("address res", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //to delete a address-
  async function deleteAddress(addressID) {
    let addressDeleted = false;
    let body = {
      address: {
        id: addressID,
      },
    };
    try {
      const response = await instance.delete(`user/address`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(body),
      });
      addressDeleted = true;
    } catch (error) {
      console.log(error);
    }
    return addressDeleted;
  }

  return {
    addOrEditAddress,
    fetchUserAddress,
    deleteAddress,
    loading,
    setLoading,
  };
}

export default useAddress;
