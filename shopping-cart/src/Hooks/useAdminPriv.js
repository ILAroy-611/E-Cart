import { useState } from "react";
import instance from "../Store/AxiosInstance";

function useAdminPriv() {
  // const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);

  // to add items into database-admin/add
  async function addOrEditItemsinDB({method,url,body}) {
    let itemAddedorEdited = false;
    try {
      let response = await instance[method](`${url}`, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      itemAddedorEdited = true;
      // console.log(response);
      // return response;
    } catch (error) {
      console.log(error);
    }
    return itemAddedorEdited;
  }

  // to get all items from database-
  async function getAllItemsAdmin() {
    console.log('in the code')
    try {
      const response = await instance.get(`admin/all`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return response ; 
      // setItems(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  //to edit an item's details
  async function editItem(itemInfo) {
    console.log(itemInfo);
    let isItemUpdated = false;
    let body = {
      item: itemInfo,
    };
    try {
      await instance.put(`admin/update`, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      // console.log(response)
      isItemUpdated = true;
    } catch (error) {
      console.log(error);
    }
    return isItemUpdated;
  }

  //to delete an item from database-
  async function deleteItem(itemID) {
    let isItemDeleted = false;
    let body = {
      item: {
        id: itemID,
      },
    };
    try {
      await instance.delete(`admin/delete`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(body),
      });
      isItemDeleted = true;
    } catch (error) {
      console.log(error);
    }
    return isItemDeleted;
  }

  //to get all users-
  async function fetchAllUsers() {
    let total = 0;
    let userList = [];
    try {
      const response = await instance.get(`admin/allUsers`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      userList = response.data.allUsers;
      // setUserList([...userList, ...response.data.allUsers ]);
      total = response.data.allUsers.length;
    } catch (error) {
      console.log(error);
    }
    return { userList, total };
  }

  //to block a user-
  async function blockUsers(userID) {
    // console.log(userID)
    let userBlocked=false;
    let body = {
      user: {
        id: userID,
      },
    };
    try {
      const response = await instance.post(
        `admin/allUsers/block`,
        JSON.stringify(body),
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      userBlocked=true;
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
    return userBlocked
  }
  async function unblockUsers(userID) {
    // console.log(userID)
    let userUnBlocked = false
    let body = {
      user: {
        id: userID,
      },
    };
    try {
      const response = await instance.post(
        `admin/allUsers/unBlock`,
        JSON.stringify(body),
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      userUnBlocked=true;
    } catch (error) {
      console.log(error);
    }
    return userUnBlocked
  }


  return {
    blockUsers,
    unblockUsers,
    fetchAllUsers,
    getAllItemsAdmin,
    addOrEditItemsinDB,
    deleteItem,
    loading, 
    setLoading,
  };
}

export default useAdminPriv;
