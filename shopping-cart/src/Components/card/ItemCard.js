import { Card } from "antd";
import { Link } from "react-router-dom";
import ActionButton from "../button/ActionButton";
import useAdminPriv from "../../Hooks/useAdminPriv";
import useAuth from "../../Hooks/useAuth";
import useProducts from "../../Hooks/useProducts";
import { useContext } from "react";
import counterContext from "../../Hooks/Context";
import "./itemcard.css";

const { Meta } = Card;

function ItemCard({ itemDetail }) {
// console.log(itemDetail);

const {deleteItem}= useAdminPriv();
const {user} = useAuth();
const {addItemtoCart} = useProducts();
const {counter, increment, decrement } = useContext(counterContext)

const handleDeleteItem= async()=>{
  let isItemDeleted= await deleteItem(itemDetail._id)
  if(isItemDeleted){
    window.location.reload();
  }
}

const handleAddItemtoCart= async()=>{
  try {
    let itemAddedtoCart = await addItemtoCart(itemDetail._id)
    if(itemAddedtoCart)increment();
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
          width: 280,
          border: '1px solid black',
        }}
        cover={<img alt="item" src={itemDetail?.image} height="300px" />}
      >
        <Meta
          title={`${itemDetail?.name} | ${itemDetail?.category} | ${
            itemDetail?.subCategory ?? ""
          }`}
          description={`${itemDetail?.discription ?? ""}`}
          style={{
            overflowWrap: "break-word",
          }}
        />
        <p>{itemDetail?.stars}</p>
        <p>&#8377;{itemDetail?.price}/- </p>
        <p>Discount:{itemDetail?.discount ?? 0}%</p>
        {
          user.isAdmin?
          <>
          <Link to="/admin/item/edit" state= {itemDetail}>
          <ActionButton Action="Edit" />
        </Link>
        <ActionButton Action="Delete" onCLick={handleDeleteItem}/></>
          :
          <>
          <ActionButton Action="Add to Cart" onCLick={handleAddItemtoCart}/>
          </>
        }
        
      </Card>
    </div>
  );
}

export default ItemCard;
