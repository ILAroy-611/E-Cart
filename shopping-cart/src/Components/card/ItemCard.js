import { Card } from "antd";
import { Link } from "react-router-dom";
import ActionButton from "../ui/button/ActionButton";
import useAdminPriv from "../../Hooks/useAdminPriv";
import useAuth from "../../Hooks/useAuth";
import useProducts from "../../Hooks/useProducts";
import { useContext, useState } from "react";
import counterContext from "../../Hooks/Context";
import { AiOutlineHeart } from "react-icons/ai";
import "./itemcard.css";

const { Meta } = Card;

function ItemCard({ itemDetail }) {
  // console.log(itemDetail);

  const { deleteItem } = useAdminPriv();
  // const {} = useAuth();
  const { addItemsinCartOrWishList } = useProducts();
  const { counter, increment, user, setFavList } = useContext(counterContext);
  const [addedStatus, setAddedStatus] = useState(false);

  const handleDeleteItem = async () => {
    let isItemDeleted = await deleteItem(itemDetail._id);
    if (isItemDeleted) {
      window.location.reload();
    }
  };

  const handleAddItemtoCart = async () => {
    try {
      setAddedStatus(true);
      let response = await addItemsinCartOrWishList({
        body: {
          product: {
            id: itemDetail._id,
          },
        },
        url: `user/cart`,
      });
      if (response) {
        setAddedStatus(false);
        increment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handleAddtoFav() {
    try {
      let response = await addItemsinCartOrWishList({
        body: {
          itemId: itemDetail._id,
        },
        url: `user/fav`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* {console.log(cart)} */}
      <Card
        hoverable
        style={{
          maxWidth:'28rem',
          objectFit:'contain',
          border: "1px solid black",
        }}
        cover={
          <Link
            to={`/products/${itemDetail._id}`}
            state={itemDetail}
            className="link item-cover"
            key={itemDetail._id}
          >
            {" "}
            <img alt="item" src={itemDetail?.image} height="250px" width="270px" />
          </Link>
        }
      >
        <Meta
          title=
            {<Link
              to={`/products/${itemDetail.name}`}
              state={itemDetail}
              className="link"
              key={itemDetail._id}
            >
              {
              `${itemDetail?.name} | ${itemDetail?.category} | $
              {itemDetail?.subCategory ?? ""}`}
            </Link>
            }
          // description={`${itemDetail?.discription ?? ""}`}
          style={{
            overflowWrap: "break-word",
          }}
        />
        <p>{itemDetail?.stars}</p>
        <p>&#8377;{itemDetail?.price}/- </p>
        <p>Discount:{itemDetail?.discount ?? 0}%</p>
        {user.isAdmin ? (
          <>
            <Link to="/admin/item/edit" state={itemDetail}>
              <ActionButton Action="Edit" />
            </Link>
            <ActionButton Action="Delete" onCLick={handleDeleteItem} />
          </>
        ) : (
          <>
            <ActionButton
              Action={addedStatus ? "Added" : "Add to Cart"}
              onCLick={handleAddItemtoCart}
            />
            <ActionButton
              Action={<AiOutlineHeart />}
              onCLick={handleAddtoFav}
            />
          </>
        )}
      </Card>
    </div>
  );
}

export default ItemCard;
