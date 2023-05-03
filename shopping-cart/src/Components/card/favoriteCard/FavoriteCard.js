import { useContext, useEffect, useState } from "react";
import { Card, Skeleton } from "antd";
import ActionButton from "../../button/ActionButton";
import useProducts from "../../../Hooks/useProducts";
import "./fav.css";
import counterContext from "../../../Hooks/Context";

function FavoriteCard({ item }) {
  const { removeItemFromFavList, fetchFavList, addItemtoCart } = useProducts();
  const { setFavList, favList, increment } = useContext(counterContext);

  async function handleRemoveItemfromFavList() {
    try {
      let favItemRemoved = await removeItemFromFavList(item._id);
      if (favItemRemoved) {
        let response = await fetchFavList();
        setFavList({ ...response.data.allFav });
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleMoveFavItemtoCart() {
    try {
      await addItemtoCart(item._id);
      await handleRemoveItemfromFavList();
      increment();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* <Skeleton loading={favItemRemoved} > */}
      <Card bordered={true} hoverable>
        <div className="cart-item-details flex">
          <img
            src={item?.image}
            alt="itemImg"
            height="140"
            width="140"
            className="flex-item"
          />
          <div className="item-description flex-item">
            <h4>{item?.name}</h4>
            <p>{item?.discription}</p>
            {item.size ? <p>{item.size}</p> : <></>}
            {item.color ? <p>{item.color}</p> : <></>}
            <footer className="cart-item-action-btns">
              <ActionButton
                Action="Remove"
                onCLick={handleRemoveItemfromFavList}
              />
              <ActionButton
                Action="Move to Cart"
                onCLick={handleMoveFavItemtoCart}
              />
            </footer>
          </div>
          <h4 className="flex-item">{item?.price}</h4>
        </div>
      </Card>
      {/* </Skeleton> */}
    </div>
  );
}

export default FavoriteCard;
