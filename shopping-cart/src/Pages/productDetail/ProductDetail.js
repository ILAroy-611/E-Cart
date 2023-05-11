import { useLocation } from "react-router-dom";
import "./productdetail.css";
import PrimaryButton from "../../Components/button/PrimaryButton";
import { useState } from "react";

function ProductDetail() {
  const { state } = useLocation();
  const [index, setIndex] = useState(0);
  //   const handleSetIndex=(ind)=>{
  //     setIndex(ind);
  //   }
  // console.log(state);
  return (
    <section>
      {/* <h2>Hello</h2> */}
      <div className="product-details-container large-display-container">
        <div className="product-preview-sec flex flex-justify">
          <div className="product-image-list">
            {state.image.map((img, i) => {
              return (
                <div>
                  <img
                    src={img}
                    alt="img"
                    width="80"
                    className="img-item"
                    onClick={() => setIndex(i)}
                  />
                </div>
              );
            })}
          </div>
          <div className="product-image">
            <img src={state?.image[index]} alt="img" width="460" />
          </div>
          <div className="product">
            <h2 className="heading-1 letter-space">{state.name}</h2>
            <div className="rating">{state.stars}</div>
            <h2 className="discount heading-2">{state?.discount ? -state?.discount+'%' : null}</h2>
            <h2 className="product-price heading-2">Price:&#8377;{state.price}/-</h2>
          </div>
          <div className="product-add-actionbar">
            <h2 className="product-price heading-2">MRP:&#8377;{state.price}</h2>
            <h2 className="product-price heading-2">Discount: {state?.discount ? state?.discount+'%' : '-NA-'}</h2>
            <h2 className="product-price heading-2">Net-Price: &#8377;{state.price*(1-0.001*state?.discount)}</h2>
            <ul>
              <li className="additional-info">
                <p>In Stock</p>
              </li>
              <li className="additional-info">
                <p>Qualified for <strong>Free Delivery</strong></p>
              </li>
            </ul>
            <h3 className="heading-3">Seller: {state.seller}</h3>
            <PrimaryButton Action={"Add to Cart"} />
            <PrimaryButton Action={"Add to Wishlist"} />
          </div>
        </div>
        <div className="customer-discription-sec">
        <h2 className="heading-2">{state.discription}</h2>
        </div>
        <div className="customer-reviews-sec"></div>
      </div>
    </section>
  );
}

export default ProductDetail;
