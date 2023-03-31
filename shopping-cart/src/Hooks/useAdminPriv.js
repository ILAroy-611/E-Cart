import { useState } from "react";
import instance from "../Store/AxiosInstance";

function useAdminPriv() {
  const [item, setItem] = useState();

  // to add items into database-
  async function addItems(itemInfo) {
    let itemAdded = false;
    let body = {
      items: [itemInfo],
    };
    try {
        console.log(JSON.stringify(body))
      const response = await instance.post(
        `admin/add`,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      );
      itemAdded = true;
      console.log(response);
      // setItem(response)
    } catch (error) {
      console.log(error);
    }
    return itemAdded;
  }

  return { addItems, item };
}

export default useAdminPriv;
