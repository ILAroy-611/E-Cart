import { useState } from "react";
import instance from "../Store/AxiosInstance";

function useProducts() {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState([]);
  const [favList, setFavList] = useState({});

  //to get all items-
  async function fetchAllProducts() {
    try {
      const response = await instance.get(`items`);
      // console.log(response.data.products);
      setProducts([...response.data.products]);
    } catch (error) {
      console.log(error);
    }
  }

  //to add item to a cart
  async function addItemtoCart(productId) {
    let itemAddedtoCart = false;
    let body = {
      product: {
        id: productId,
      },
    };
    try {
      const response = await instance.post(`user/cart`, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      // console.log(response);
      itemAddedtoCart = true;
    } catch (error) {
      console.log(error);
    }
    return itemAddedtoCart;
  }

  //to get all items from cart--
  async function getItemsFromCart() {
    let success = false;
    try {
      const response = await instance.get(`user/cart`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      // console.log("hi we are in cart", response.data.cart.product);
      success = true;
      setCart([...response.data.cart.product]);
      // setCounter(cart.length);
    } catch (error) {
      console.log(error);
    }
    return success;
  }

  async function removeItemsFromCart(removeItemId) {
    let removed = false;
    let body = {
      product: {
        id: removeItemId,
      },
    };
    try {
      const response = await instance.delete(`user/cart`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(body),
      });
      // console.log(response);
      // getItemsFromCart()
      removed = true;
    } catch (error) {
      console.log(error);
    }
    return removed;
  }

  // to add an item into favorite list
  async function addItemtoFavList(item_id) {
    let favorited = false;
    let body = {
      itemId: item_id,
    };
    try {
      const response = await instance.post(`user/fav`, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      favorited = true;
      console.log("fav list", response.data.favList);
      // setFavList(response.data.favList)
    } catch (error) {
      console.log(error);
    }
  }

  //to fetch favorite list
  async function fetchFavList() {
    try {
      const response = await instance.get(`user/fav`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      // console.log('fetch favlist',response.data.allFav);
      // setFavList({...response.data.allFav});
      return response;
    } catch (error) {
      console.log("fetchFavList error", error);
    }
  }

  //to remove item from favList
  async function removeItemFromFavList(item_id) {
    let body = {
      itemId: item_id,
    };
    let favItemRemoved = false;
    try {
      const response = await instance.delete(`user/fav`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(body),
      });
      favItemRemoved = true;
      console.log(response.data.msg);
    } catch (error) {
      console.log("error in removeItemFromFavList", error);
    }
    return favItemRemoved;
  }

  return {
    fetchAllProducts,
    products,
    addItemtoCart,
    getItemsFromCart,
    cart,
    removeItemsFromCart,
    addItemtoFavList,
    fetchFavList,
    favList,
    setFavList,
    removeItemFromFavList,
  };
}

export default useProducts;
