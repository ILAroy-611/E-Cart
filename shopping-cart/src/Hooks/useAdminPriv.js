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
      console.log(JSON.stringify(body));
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
      setItems(response.data.products)
    } catch (error) {
      console.log(error);
    }
  }

  async function editItem(){

  }

  return { addItems, items, getAllItemsAdmin, editItem };
}

export default useAdminPriv;
