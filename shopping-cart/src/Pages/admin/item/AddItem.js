import { useFormik } from "formik";
import PrimaryButton from "../../../Components/button/PrimaryButton";
import SCInput from "../../../Components/sc-input/SCInput";
import SCSelect from "../../../Components/select/SCSelect";
import { initialValues } from "./helper";
import useAdminPriv from "../../../Hooks/useAdminPriv";
import "./additem.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function AddItem() {
  const { addItems } = useAdminPriv();
  const [editModeOn, setEditModeOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { mode } = useParams();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      await addItems({
        category: values.category,
        subCatogery: values.subCatogery,
        name: values.name,
        image: values.image,
        price: values.price,
        brand: values.brand,
        stars: values.stars,
        seller: values.seller,
        quantity: values.quantity,
        soldCount: values.soldCount,
        discount: values.discount,
        size: values.size,
        varient:{
          gender: values.gender,
          ageGroup: values.ageGroup,
          genere: values.genere,
          weight: values.weight,
          color: values.color,
        }
      });
    },
  });

  useEffect(() => {
    setLoading(false);
    mode === "edit" ? setEditModeOn(true) : setEditModeOn(false);
  }, []);

  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        <div className="flex add-item-container">
          <form className="add-item-form">
            <fieldset>
              {editModeOn ? (
                <legend>Edit your item</legend>
              ) : (
                <legend>Add a new item</legend>
              )}
              <h3>Basic info about item</h3>
              <SCInput
                type="text"
                name="name"
                id="cart-add-item-name"
                placeholder="Name of item"
                formik={formik}
              />
              <SCInput
                type="text"
                name="category"
                id="cart-add-item-category"
                placeholder="Category of item"
                formik={formik}
              />
              <SCInput
                type="text"
                name="subCatogery"
                id="cart-add-item-sub-category"
                placeholder="Sub-category of item"
                formik={formik}
              />
              <SCInput
                type="text"
                name="brand"
                id="cart-add-item-brand"
                placeholder="Brand of item"
                formik={formik}
              />
              <SCInput
                type="number"
                name="price"
                id="cart-add-item-price"
                placeholder="Price of item"
                formik={formik}
              />
              <SCInput
                type="number"
                name="quantity"
                id="cart-add-item-quantity"
                placeholder="Quantity of item"
                formik={formik}
              />
              <SCInput
                type="text"
                name="seller"
                id="cart-add-item-seller"
                placeholder="Seller of item"
                formik={formik}
              />
              <SCInput
                type="text"
                name="image"
                id="cart-add-item-imageURL"
                placeholder="Image URL of item"
                formik={formik}
              />
              <SCInput
                type="text"
                name="stars"
                id="cart-add-item-star"
                placeholder="Stars/Rating"
                formik={formik}
              />
            </fieldset>
          </form>
          <div className="varient">
            <h3>Item Varients</h3>
            <SCInput
              type=""
              name=""
              id="cart-add-item-genere"
              placeholder="Genere of item"
              formik={formik}
            />
            <SCInput
              type="text"
              name="ageGroup"
              id="cart-add-item-ageGroup"
              placeholder="Item is suitable for which age group?"
              formik={formik}
            />
            <SCInput
              type="number"
              name="weight"
              id="cart-add-item-weight"
              placeholder="Weight of item"
              formik={formik}
            />
            <SCInput
              type="text"
              name="color"
              id="cart-add-item-color"
              placeholder="Color of item"
              formik={formik}
            />
            <div className="flex gender-select">
              <h4>Select Gender:</h4> <SCSelect formik={formik} name="gender" />
            </div>
          </div>
        </div>
      )}

      <PrimaryButton
        Action={editModeOn ? `Edit item` : `Add item`}
        onCLick={formik.handleSubmit}
      />
    </>
  );
}

export default AddItem;
