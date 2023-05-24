import { useFormik } from "formik";
import PrimaryButton from "../../../Components/ui/button/PrimaryButton";
import SCInput from "../../../Components/ui/sc-input";
import SCSelect from "../../../Components/ui/select";
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
  const { addOrEditItemsinDB, loading, setLoading } = useAdminPriv();
  const [editModeOn, setEditModeOn] = useState(false);
  // const [loading, setLoading] = useState(true);
  const { mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = getInitialValues(location.state);
  // console.log(location.state)

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      let addFunc = async () => {
        let body = {
          items: [
            {
              category: values.category,
              subCatogery: values.subCatogery,
              name: values.name,
              discription: values.discription.split("|"),
              image: values.image.split("|"),
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
            },
          ],
        };
        try {
          let itemAdded = await addOrEditItemsinDB({
            body,
            method: "post",
            url: "admin/add",
          });
          if (itemAdded) {
            navigate(`/admin/items`);
          }
        } catch (error) {
          console.error(error);
        }
      };

      let editFunc = async () => {
        let body = {
          item: {
            id: location.state._id,
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
          },
        };
        try {
          let isItemUpdated = await addOrEditItemsinDB({
            body,
            method: "put",
            url: "admin/update",
          });
          if (isItemUpdated) {
            navigate(`/admin/items`);
          }
        } catch (error) {
          console.error(error);
        }
      };
      editModeOn ? editFunc() : addFunc();
    },
  });

  useEffect(() => {
    setLoading(false);
    mode === "edit" ? setEditModeOn(true) : setEditModeOn(false);
  }, []);

  return (
    // <>
    //   {loading ? (
    //     <>
    //       <Skeleton />
    //     </>
    //   ) : (
    //     <>
    //       <div className="medium-display-container">
    //         <div className="flex">
    //           <form className="add-item-form">
    //             <fieldset>
    //               {editModeOn ? (
    //                 <legend>Edit your item</legend>
    //               ) : (
    //                 <legend>Add a new item</legend>
    //               )}
    //               <h3 className="heading-3">Basic info about item</h3>
    //               {inputOption.map((option) => {
    //                 return <SCInput option={option} formik={formik} />;
    //               })}
    //             </fieldset>
    //           </form>
    //           <div className="varient">
    //             <h3 className="heading-3">Item Varients</h3>
    //             {varientOptions.map((varients) => {
    //               return <SCInput option={varients} formik={formik} />;
    //             })}
    //             <div className="flex gender-select">
    //               <h4>Select Gender:</h4>{" "}
    //               <SCSelect
    //                 formik={formik}
    //                 name="gender"
    //                 options={genderOptions}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         <footer className="flex flex-justify">
    //           <PrimaryButton
    //             Action={editModeOn ? `Edit item` : `Add item`}
    //             onCLick={formik.handleSubmit}
    //           />
    //           <PrimaryButton
    //             Action={"Go Back"}
    //             onCLick={() => navigate("/admin/items")}
    //           />
    //         </footer>
    //       </div>
    //     </>
    //   )}
    // </>
    <Skeleton loading={loading}>
      <div className="medium-display-container">
        <div className="flex">
          <form className="add-item-form">
            <fieldset>
              {editModeOn ? (
                <legend>Edit your item</legend>
              ) : (
                <legend>Add a new item</legend>
              )}
              <h3 className="heading-3">Basic info about item</h3>
              {inputOption.map((option) => {
                return <SCInput option={option} formik={formik} />;
              })}
            </fieldset>
          </form>
          <div className="varient">
            <h3 className="heading-3">Item Varients</h3>
            {varientOptions.map((varients) => {
              return <SCInput option={varients} formik={formik} />;
            })}
            <div className="flex gender-select">
              <h4>Select Gender:</h4>{" "}
              <SCSelect formik={formik} name="gender" options={genderOptions} />
            </div>
          </div>
        </div>
        <footer className="flex flex-justify">
          <PrimaryButton
            Action={editModeOn ? `Edit item` : `Add item`}
            onCLick={formik.handleSubmit}
          />
          <PrimaryButton
            Action={"Go Back"}
            onCLick={() => navigate("/admin/items")}
          />
        </footer>
      </div>
    </Skeleton>
  );
}

export default AddItem;
