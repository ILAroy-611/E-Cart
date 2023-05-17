import { useContext, useEffect } from "react";
import useProducts from "../../Hooks/useProducts";
import { NewCard } from "../../Components/card";
import counterContext from "../../Hooks/Context";
import ActionButton from "../../Components/button/ActionButton";
import "./favlist.css";

function DisplayFavList() {
  const {
    getItemsFromCartOrWishList,
    removeItemsFromCartOrWishList,
    addItemsinCartOrWishList,
  } = useProducts();
  const { favList, setFavList, increment,cartInfo } = useContext(counterContext);

  async function handleFetchFavList() {
    // console.log("in useEffect of displayFavList");
    try {
      let response = await getItemsFromCartOrWishList({
        url: `user/fav`,
      });
      //   console.log("fetching done");
      if (response.data.allFav.fav) setFavList([...response.data.allFav.fav]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveItemfromFavList(favItem) {
    try {
      let favItemRemoved = await removeItemsFromCartOrWishList({
        body: {
          itemId: favItem._id,
        },
        url: `user/fav`,
      });
      // console.log(favItemRemoved);
      if (favItemRemoved) {
        let response = await getItemsFromCartOrWishList({ url: `user/fav` });
        setFavList([...response.data.allFav.fav]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleMoveFavItemtoCart(favItem) {
    try {
      await addItemsinCartOrWishList({
        body: {
          product: {
            id: favItem._id,
          },
        },
        url: `user/cart`,
      });
      await handleRemoveItemfromFavList(favItem);
      increment();
    } catch (error) {
      console.log(error);
    }
  }
  const meta = {
    meta_title: "",
    meta_description: "",
    meta_avatar: "",
    meta_avatarShape: "",
    meta_avatarSize: "",
  };

  useEffect(() => {
    handleFetchFavList();
  }, [cartInfo.counter]);

  //   console.log("parent", favList?.fav);
  return (
    <div className="sm-display-container">
      {favList.length >= 1 ? (
        <>
          {console.log("in favList parent")}
          <h2>My WishList</h2>
          {favList.map((favItem) => (
            // <FavCard item={favItem} />
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
                  onCLick={() => handleRemoveItemfromFavList(favItem)}
                />,
                <ActionButton
                  Action="Move to Cart"
                  onCLick={() => handleMoveFavItemtoCart(favItem)}
                />,
              ]}
            >
              <div className="cart-item-details flex flex-justify">
                {/* <input type="checkbox" name="selected_item" className="" /> */}
                <img
                  src={favItem.image}
                  alt="itemImg"
                  height="140"
                  width="140"
                  className="cart-item-image"
                />
                <div className="cart-item-description ">
                  <h4>{favItem.name}</h4>
                  {favItem.size ? <p>{favItem.size}</p> : <></>}
                  {favItem.color ? <p>{favItem.color}</p> : <></>}
                </div>
                <div className="cart-item-price">
                  <h2 className="product-price heading-2">
                    MRP:&#8377;{favItem.price}
                  </h2>
                  <h2 className="product-price heading-2">
                    Discount:{" "}
                    {favItem?.discount ? favItem?.discount + "%" : "-NA-"}
                  </h2>
                  <h2 className="product-price heading-2">
                    Net-Price: &#8377;
                    {favItem.price * (1 - 0.001 * favItem?.discount)}
                  </h2>
                </div>
              </div>
            </NewCard>
          ))}
        </>
      ) : (
        <h2>
          {/* {console.log("in favList parent null")} */}
          No items added to your wish list yet!
        </h2>
      )}
    </div>
  );
}

export default DisplayFavList;
