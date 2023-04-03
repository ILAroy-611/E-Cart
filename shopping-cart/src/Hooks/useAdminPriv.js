import { useState } from "react";
import instance from "../Store/AxiosInstance";

function useAdminPriv() {
  const [items, setItems] = useState();

  // to add items into database-
  async function addItems(itemInfo) {
    let itemAdded = false;
    let body = {
      items: [itemInfo],
    };
    try {
      const response = await instance.post(`admin/add`, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      itemAdded = true;
      // console.log(response);
      // setItem(response)
    } catch (error) {
      console.log(error);
    }
    return itemAdded;
  }

  // to get all items from database-
  async function getAllItemsAdmin() {
    try {
      const response = await instance.get(`admin/all`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setItems(response.data.products);
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
    let isItemDeleted= false;
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
      isItemDeleted=true;
    } catch (error) {
      console.log(error);
    }
    return isItemDeleted
  }

  return { addItems, items, getAllItemsAdmin, editItem, deleteItem };
}

export default useAdminPriv;
