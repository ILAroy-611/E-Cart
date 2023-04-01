import { Card } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ActionButton from "../button/ActionButton";
// import useAdminPriv from "../../Hooks/useAdminPriv";
import "./itemcard.css";

const { Meta } = Card;

function ItemCard({ itemDetail }) {
console.log(itemDetail);
  return (
    <div>
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
        <Link to="/admin/item/edit" state= {itemDetail}>
          <ActionButton Action="Edit" />
        </Link>
        <ActionButton Action="Delete" />
      </Card>
    </div>
  );
}

export default ItemCard;
