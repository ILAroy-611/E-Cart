import { useState } from "react";
import instance from "../Store/AxiosInstance";

function useProducts() {
  // const [products, setProducts] = useState();
  // const [cart, setCart] = useState([]);
  // const [favList, setFavList] = useState({});

  //to get all items-
  async function fetchAllProducts() {
    try {
      const response = await instance.get(`items`);
      return response;
      // setProducts([...response.data.products]);
    } catch (error) {
      console.log(error);
    }
  }

  //to add items to cart/ wishList
  async function addItemsinCartOrWishList({ body, url }) {
    try {
      const response = await instance.post(url, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      // console.log(response.data.cart.product);
      // console.log(response.data.favList.fav);
      return response;
    } catch (error) {
      console.log("error in adding/getting item to cart/wishList", error);
    }
  }

  // to get items from cart or wishlist-
  async function getItemsFromCartOrWishList({ url }) {
    try {
      const response = await instance.get(url, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log("error in getting item from cart/wishList", error);
    }
  }

  //to remove items from cart/wishList-
  async function removeItemsFromCartOrWishList({ url, body }) {
    try {
      const response = await instance.delete(url, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(body),
      });
      return response.data.msg;
    } catch (error) {
      console.log("error in removeItemsFromCartOrWishList", error);
    }
  }

  //to remove items from cart-
  // async function removeItemsFromCart(removeItemId) {
  //   let removed = false;
  //   let body = {
  //     product: {
  //       id: removeItemId,
  //     },
  //   };
  //   try {
  //     const response = await instance.delete(`user/cart`, {
  //       headers: {
  //         Authorization: `${localStorage.getItem("token")}`,
  //       },
  //       data: JSON.stringify(body),
  //     });
  //     // console.log(response);
  //     // getItemsFromCart()
  //     removed = true;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return removed;
  // }

  //to remove item from favList
  // async function removeItemFromFavList(item_id) {
  //   let body = {
  //     itemId: item_id,
  //   };
  //   let favItemRemoved = false;
  //   try {
  //     const response = await instance.delete(`user/fav`, {
  //       headers: {
  //         Authorization: `${localStorage.getItem("token")}`,
  //       },
  //       data: JSON.stringify(body),
  //     });
  //     favItemRemoved = true;
  //     console.log(response.data.msg);
  //   } catch (error) {
  //     console.log("error in removeItemFromFavList", error);
  //   }
  //   return favItemRemoved;
  // }

  // to add an item into favorite list
  //  async function addItemtoFavList(item_id) {
  //    let favorited = false;
  //   let body = {
  //     itemId: item_id,
  //   };
  //   try {
  //     const response = await instance.post(`user/fav`, JSON.stringify(body), {
  //       headers: {
  //         Authorization: `${localStorage.getItem("token")}`,
  //       },
  //     });
  //     favorited = true;
  //     console.log("fav list", response.data.favList);
  //     // setFavList(response.data.favList)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // to fetch favorite list
  // async function fetchFavList() {
  //   try {
  //     const response = await instance.get(`user/fav`, {
  //       headers: {
  //         Authorization: `${localStorage.getItem("token")}`,
  //       },
  //     });
  //     // console.log('fetch favlist',response.data.allFav);
  //     // setFavList({...response.data.allFav});
  //     return response;
  //   } catch (error) {
  //     console.log("fetchFavList error", error);
  //   }
  // }

  //to add item to a cart
  // async function addItemtoCart(productId) {
  //   let itemAddedtoCart = false;
  //   let body = {
  //     product: {
  //       id: productId,
  //     },
  //   };
  //   try {
  //     const response = await instance.post(`user/cart`, JSON.stringify(body), {
  //       headers: {
  //         Authorization: `${localStorage.getItem("token")}`,
  //       },
  //     });
  //     // console.log(response);
  //     itemAddedtoCart = true;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return itemAddedtoCart;
  // }

  //to get all items from cart--
  // async function getItemsFromCart() {
  //   let success = false;
  //   try {
  //     const response = await instance.get(`user/cart`, {
  //       headers: {
  //         Authorization: `${localStorage.getItem("token")}`,
  //       },
  //     });
  //     // console.log("hi we are in cart", response.data.cart.product);
  //     success = true;
  //     // setCart([...response.data.cart.product]);
  //     // setCounter(cart.length);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return success;
  // }

  //to get all comments for a particular product
  async function getAllCommentsforProduct(prodId) {
    let body = {
      comment: {
        productId: prodId,
      },
    };
    try {
      const response = await instance.post(`comments/all`, JSON.stringify(body));
      // console.log(response.data.comments);
      return response;
    } catch (error) {
      console.log("get comments error", error.response.message);
    }
  }

  //to add comment for a product-
  async function addOrEditComment({ body, method }) {
    try {
      let response = await instance[method](`comments`, JSON.stringify(body), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log("add/edit comment error", error);
    }
  }

  //to delete a comment-
  async function deleteComment( body ) {
    try {
      let response = await instance.delete(`comments`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(body),
      });
    } catch (error) {
      console.log("delete comment error", error);
    }
  }

  return {
    fetchAllProducts,
    addItemsinCartOrWishList,
    getItemsFromCartOrWishList,
    removeItemsFromCartOrWishList,
    getAllCommentsforProduct,
    addOrEditComment,
    deleteComment,
  };
}
//addItemtoCart,
//getItemsFromCart,
// addItemtoFavList,
// fetchFavList,
export default useProducts;
