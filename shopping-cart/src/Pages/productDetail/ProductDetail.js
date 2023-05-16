import { useLocation } from "react-router-dom";
import PrimaryButton from "../../Components/button/PrimaryButton";
import { useContext, useEffect, useState } from "react";
import counterContext from "../../Hooks/Context";
import useProducts from "../../Hooks/useProducts";
import CommentCard from "../../Components/card/commentCard/CommentCard";
import ActionButton from "../../Components/button/ActionButton";
import CustomModal from "../../Components/modal/Modal";
import useModal from "../../Hooks/useModal";
import SCInput from "../../Components/sc-input/SCInput";
import "./productdetail.css";
import { addCommentOption, initialValues } from "./helper";
import { useFormik } from "formik";

function ProductDetail() {
  const { state } = useLocation();
  const [index, setIndex] = useState(0);
  const { commentsList, setCommentsList } = useContext(counterContext);
  const { openModal, toggle, handleConfirmLoading, confirmLoading } = useModal();

  const { getAllCommentsforProduct, addOrEditComment } = useProducts();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      let body = {
        comment: {
          stars: values.stars,
          body: values.body,
          productId: state._id,
        },
      };
      try {
        let response = await addOrEditComment({ method: "post", body });
        handleConfirmLoading();
        setCommentsList([...commentsList, ...response.data.comment]);
        toggle();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleGetComments = async () => {
    try {
      let response = await getAllCommentsforProduct(state._id);
      // console.log(response, state._id);
      setCommentsList([...response.data.comments]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetComments();
  }, []);
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
            <h2 className="discount heading-2">
              {state?.discount ? -state?.discount + "%" : null}
            </h2>
            <h2 className="product-price heading-2">
              Price:&#8377;{state.price}/-
            </h2>
          </div>
          <div className="product-add-actionbar">
            <h2 className="product-price heading-2">
              MRP:&#8377;{state.price}
            </h2>
            <h2 className="product-price heading-2">
              Discount: {state?.discount ? state?.discount + "%" : "-NA-"}
            </h2>
            <h2 className="product-price heading-2">
              Net-Price: &#8377;{state.price * (1 - 0.001 * state?.discount)}
            </h2>
            <ul>
              <li className="additional-info">
                <p>In Stock</p>
              </li>
              <li className="additional-info">
                <p>
                  Qualified for <strong>Free Delivery</strong>
                </p>
              </li>
            </ul>
            <h3 className="heading-3">Seller: {state.seller}</h3>
            <PrimaryButton Action={"Add to Cart"} />
            <PrimaryButton Action={"Add to Wishlist"} />
          </div>
        </div>
        <div className="customer-discription-sec">
          {state.discription.map((desc) => {
            return (
              <ul>
                <li>
                  <h2 className="heading-2">{desc}</h2>
                </li>
              </ul>
            );
          })}
        </div>
        <div className="customer-reviews-sec">
          <div className="flex flex-justify">
            <h2 className="heading-2 customer-review-heading">
              Customer Reviews
            </h2>
            <ActionButton Action="Add Comment" onCLick={toggle} />
            <CustomModal
              open={openModal}
              modal_title="Add Comment"
              handleCancel={toggle}
              handleOk={formik.handleSubmit}
              confirmLoading={confirmLoading}
            >
              {addCommentOption.map((option) => (
                <SCInput formik={formik} option={option} />
              ))}
            </CustomModal>
          </div>
          {commentsList != null ? (
            commentsList.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                prodId={state._id}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
