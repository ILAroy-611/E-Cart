import { Card } from "antd";
import ActionButton from "../../button/ActionButton";
import useProducts from "../../../Hooks/useProducts";
import './cartitem.css';

function CartItem({ item }) {

  const{removeItemsFromCart}= useProducts();

  const handleRemoveItemfromCart=async ()=>{
    try {
      const response =await removeItemsFromCart(item._id)
      if(response){
        alert(`${item.name} removed successfully`);
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="cart-item-container">
      <Card bordered={true} hoverable >
        <div className="cart-item-details flex">
          <input type="checkbox" name="selected_item" className=""/>
          <img src={item.image} alt="itemImg" height="140" width="140" className="flex-item"/>
          <div className="item-description flex-item">
            <h4>{item.name}</h4>
            <p>{item.discription}</p>
            {item.size ? <p>{item.size}</p> : <></>}
            {item.color ? <p>{item.color}</p> : <></>}
            <footer className="cart-item-action-btns">
              <ActionButton Action="Delete" onCLick={handleRemoveItemfromCart}/>
            </footer>
          </div>
          <h4 className="flex-item">{item.price}</h4>
        </div>
      </Card>
    </div>
  );
}

export default CartItem;
