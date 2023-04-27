import { useContext, useEffect, useState } from "react";
import useProducts from "../../Hooks/useProducts";
import { CartItem } from "../../Components/card";
import SubTotalCard from "../../Components/subTotalCard/SubTotalCard";
import "./mycart.css";
import counterContext from "../../Hooks/Context";

function MyCart() {
  const { getItemsFromCart, cart } = useProducts();
  const {counter} = useContext(counterContext)

  useEffect(() => {
    // console.log('step-1');
    async function handleGetCartItems() {
      try {
        let success = await getItemsFromCart();
      } catch (error) {
        console.log(error);
      }
    }
    handleGetCartItems();
  }, [counter]);

  return (
    <>
      {cart ? (
        <div className="cart-outer-container">
          {/* {console.log('step-2')} */}
          <h3 className="cart-heading">My Shopping Cart</h3>
          <div className=" cart-inner-container flex">
            <div className="cart-detail-container">
              {cart.map((item) => (
                <CartItem item={item} />
              ))}
            </div>
            <div className="cart-subtotal-container">
              <SubTotalCard
                cart_total={"25000"}
                total_item_in_cart={`${cart.length}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default MyCart;
