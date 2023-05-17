import { useContext, useEffect } from "react";
import useProducts from "../../Hooks/useProducts";
import { NewCard } from "../../Components/card";
import SubTotalCard from "../../Components/subTotalCard/SubTotalCard";
import counterContext from "../../Hooks/Context";
import ActionButton from "../../Components/button/ActionButton";
import "./mycart.css";

function MyCart() {
  const { getItemsFromCartOrWishList, removeItemsFromCartOrWishList } =
    useProducts();
  const { cartInfo, setCartInfo } = useContext(counterContext);
  let totalPrice = 0;

  const handleRemoveItemfromCart = async (item) => {
    try {
      const response = await removeItemsFromCartOrWishList({
        body: {
          product: {
            id: item._id,
          },
        },
        url: `user/cart`,
      });
      if (response) {
        alert(`${item.name} removed successfully`);
        const response = await getItemsFromCartOrWishList({ url: `user/cart` });
        setCartInfo({
          ...cartInfo,
          cart: response.data.cart.product,
          counter: response.data.cart.product.length,
        });
        // decrement();
        // window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const meta = {
    meta_title: "",
    meta_description: "",
    meta_avatar: "",
    meta_avatarShape: "",
    meta_avatarSize: "",
  };

  useEffect(() => {
    // console.log('step-1');
    async function handleGetCartItems() {
      try {
        const response = await getItemsFromCartOrWishList({
          method: "get",
          url: `user/cart`,
        });
        await setCartInfo({
          ...cartInfo,
          cart: response.data.cart.product,
          counter: response.data.cart.product.length,
        });
      } catch (error) {
        console.log(error);
      }
    }
    handleGetCartItems();
  }, [cartInfo.counter]);

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  totalPrice = cartInfo.cart.reduce(
    (total, item) => total + item.price * (1 - item?.discount * 0.001),
    0
  );
  totalPrice = roundToTwo(totalPrice);
  // console.log(totalPrice);
  return (
    <>
      {cartInfo.cart ? (
        <div className="large-display-container">
          {/* {console.log('step-2')} */}
          <h3 className="cart-heading">My Shopping Cart</h3>
          <div className="flex-justify flex">
            <div className="cart-detail-container">
              {cartInfo.cart.map((item) => (
                // <CartItem item={item} />
                <NewCard
                  bordered={true}
                  meta={meta}
                  card_style={{
                    border: "1px solid black",
                    marginTop: "8px",
                    textAlign: "left",
                  }}
                  card_actions={[
                    <ActionButton
                      Action="Delete"
                      onCLick={() => handleRemoveItemfromCart(item)}
                    />,
                  ]}
                >
                  <div className="cart-item-details flex flex-justify">
                    {/* <input type="checkbox" name="selected_item" className="" /> */}
                    <img
                      src={item.image}
                      alt="itemImg"
                      height="140"
                      width="140"
                      className="cart-item-image"
                    />
                    <div className="cart-item-description ">
                      <h4>{item.name}</h4>
                      {item.size ? <p>{item.size}</p> : <></>}
                      {item.color ? <p>{item.color}</p> : <></>}
                    </div>
                    <div className="cart-item-price">
                      <h2 className="product-price heading-2">
                        MRP:&#8377;{item.price}
                      </h2>
                      <h2 className="product-price heading-2">
                        Discount:{" "}
                        {item?.discount ? item?.discount + "%" : "-NA-"}
                      </h2>
                      <h2 className="product-price heading-2">
                        Net-Price: &#8377;
                        {item.price * (1 - 0.001 * item?.discount)}
                      </h2>
                    </div>
                  </div>
                </NewCard>
              ))}
            </div>
            <div className="cart-subtotal-container">
              <SubTotalCard
                cart_total={`${totalPrice}`}
                total_item_in_cart={`${cartInfo.cart.length}`}
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
