// import { Card } from "antd";
// import ActionButton from "../../button/ActionButton";
// import useProducts from "../../../Hooks/useProducts";
// import { useContext } from "react";
// import counterContext from "../../../Hooks/Context";
// import "./cartitem.css";

// function CartItem({ item }) {
//   const { removeItemsFromCartOrWishList, getItemsFromCartOrWishList } =
//     useProducts();
//   const { decrement, cartInfo, setCartInfo } = useContext(counterContext);

//   const handleRemoveItemfromCart = async () => {
//     try {
//       const response = await removeItemsFromCartOrWishList({
//         body: {
//           product: {
//             id: item._id,
//           },
//         },
//         url: `user/cart`,
//       });
//       if (response) {
//         alert(`${item.name} removed successfully`);
//         const response = await getItemsFromCartOrWishList({url:`user/cart`});
//         setCartInfo({...cartInfo, cart:response.data.cart.product, counter:response.data.cart.product.length})
//         // decrement();
//         // window.location.reload()
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  

//   return (
//     <div className="cart-item-container">
//       <Card bordered={true} hoverable>
//         <div className="cart-item-details flex">
//           {/* <input type="checkbox" name="selected_item" className="" /> */}
//           <img
//             src={item.image}
//             alt="itemImg"
//             height="140"
//             width="140"
//             className="flex-item"
//           />
//           <div className="item-description flex-item">
//             <h4>{item.name}</h4>
//             {/* <p>{item.discription}</p> */}
//             {item.size ? <p>{item.size}</p> : <></>}
//             {item.color ? <p>{item.color}</p> : <></>}
//             <footer className="cart-item-action-btns">
//               <ActionButton
//                 Action="Delete"
//                 onCLick={handleRemoveItemfromCart}
//               />
//             </footer>
//           </div>
//           <h4 className="flex-item">{item.price}</h4>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default CartItem;
