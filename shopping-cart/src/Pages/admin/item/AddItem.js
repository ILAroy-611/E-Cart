import { useFormik } from "formik";
import PrimaryButton from "../../../Components/button/PrimaryButton";
import SCInput from "../../../Components/sc-input/SCInput";
import SCSelect from "../../../Components/select/SCSelect";
import { genderOptions, initialValues, inputOption, varientOptions } from "./helper";
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
        varient: {
          gender: values.gender,
          ageGroup: values.ageGroup,
          genere: values.genere,
          weight: values.weight,
          color: values.color,
        },
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
              <h4>Select Gender:</h4> <SCSelect formik={formik} name="gender" options={genderOptions} />
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
