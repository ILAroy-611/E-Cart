import { useState } from "react";
import instance from "../Store/AxiosInstance";

function useProducts() {
  const [products, setProducts] = useState();
  const [cart, setCart]= useState([])

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
    let body={
        product:{
            id: productId
          }
    }
    try {
      const response = await instance.post(`user/cart`, JSON.stringify(body), {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      itemAddedtoCart=true;
    } catch (error) {console.log(error);}
    return itemAddedtoCart;
  }

  //to get all items from cart--
async function getItemsFromCart(){
  let success= false;
    try {
        const response = await instance.get(`user/cart`,{
            headers:{
                Authorization:`${localStorage.getItem('token')}`
            }
        })
        // console.log('hi we are in cart',response.data.cart.product);
        success=true;
        setCart([...response.data.cart.product])
    } catch (error) {
        console.log(error);
    }
    return success
}

async function removeItemsFromCart(removeItemId){
  let removed= false
  let body={
    product:{
      id: removeItemId
    }
  }
  try {
    const response = await instance.delete(`user/cart`,{
      headers:{
        Authorization:`${localStorage.getItem('token')}`
      },
      data: JSON.stringify(body),
    })
    console.log(response);
    removed=true;
  } catch (error) {
    console.log(error);
  }
return removed
}
  return { fetchAllProducts, products, addItemtoCart, getItemsFromCart, cart, removeItemsFromCart };
}

export default useProducts;
