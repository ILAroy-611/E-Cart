import { useFormik } from "formik";
import PrimaryButton from "../../../Components/button/PrimaryButton";
import SCInput from "../../../Components/sc-input/SCInput";
import SCSelect from "../../../Components/select/SCSelect";
import {
  genderOptions,
  getInitialValues,
  inputOption,
  varientOptions,
} from "./helper";
import useAdminPriv from "../../../Hooks/useAdminPriv";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import "./additem.css";

function AddItem() {
  const { addItems,editItem } = useAdminPriv();
  const [editModeOn, setEditModeOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = getInitialValues(location.state);
  // console.log(location.state)

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      let addFunc = async () => {
        try {
          let itemAdded = await addItems({
            category: values.category,
            subCatogery: values.subCatogery,
            name: values.name,
            discription: values.discription,
            image: values.image,
            price: values.price,
            discount: values.discount,
            brand: values.brand,
            stars: values.stars,
            seller: values.seller,
            quantity: values.quantity,
            soldCount: values.soldCount,
            size: values.size,
            varient: {
              gender: values.gender,
              ageGroup: values.ageGroup,
              genere: values.genere,
              weight: values.weight,
              color: values.color,
            },
          });
          if (itemAdded) {
            navigate(`/admin/items`);
          }
        } catch (error) {
          console.error(error);
        }
      };
      let editFunc=async()=>{
        try {
          let isItemUpdated = await editItem({
            id:location.state._id,
            category: values.category,
            subCatogery: values.subCatogery,
            name: values.name,
            discription: values.discription,
            image: values.image,
            price: values.price,
            discount: values.discount,
            brand: values.brand,
            stars: values.stars,
            seller: values.seller,
            quantity: values.quantity,
            soldCount: values.soldCount,
            size: values.size,
            varient: {
              gender: values.gender,
              ageGroup: values.ageGroup,
              genere: values.genere,
              weight: values.weight,
              color: values.color,
            },
          });
          if (isItemUpdated) {
            navigate(`/admin/items`);
          }
        } catch (error) {
          console.error(error);
        }
      }
      editModeOn ? editFunc() : addFunc();
    },
  });

  useEffect(() => {
    setLoading(false);
    mode === "edit" ? setEditModeOn(true) : setEditModeOn(false);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <>
          <div className="flex add-item-container">
            <form className="add-item-form">
              <fieldset>
                {editModeOn ? (
                  <legend>Edit your item</legend>
                ) : (
                  <legend>Add a new item</legend>
                )}
                <h3>Basic info about item</h3>
                {inputOption.map((option) => {
                  return (
                    <SCInput
                      type={option.type}
                      name={option.name}
                      id={option.id}
                      placeholder={option.placeholder}
                      formik={formik}
                    />
                  );
                })}
              </fieldset>
            </form>
            <div className="varient">
              <h3>Item Varients</h3>
              {varientOptions.map((varients) => {
                return (
                  <SCInput
                    type={varients.type}
                    name={varients.name}
                    id={varients.id}
                    placeholder={varients.placeholder}
                    formik={formik}
                  />
                );
              })}
              <div className="flex gender-select">
                <h4>Select Gender:</h4>{" "}
                <SCSelect
                  formik={formik}
                  name="gender"
                  options={genderOptions}
                />
              </div>
            </div>
          </div>
          <PrimaryButton
            Action={editModeOn ? `Edit item` : `Add item`}
            onCLick={formik.handleSubmit}
          />
        </>
      )}
    </>
  );
}

export default AddItem;
