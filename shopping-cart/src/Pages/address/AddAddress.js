import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/button/PrimaryButton";
import SCInput from "../../Components/sc-input/SCInput";
import useAddress from "../../Hooks/useAddress";
import { validationSchema } from "./Validation";
import { addressOption, getInitialValues } from "./helper";
import "./addAddress.css";
import { useState } from "react";

function AddAddress() {
  const navigate = useNavigate();
  const { addOrEditAddress } = useAddress();
  const location = useLocation();
  const initialValues = getInitialValues(location?.state?.address);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let newAddress = {
        name: values.name,
        sonOf: values.sonOf,
        mobNumber: values.mobNumber,
        address1: values.address1,
        address2: values.address2,
        area: values.area,
        district: values.district,
        state: values.state,
        pinCode: values.pinCode,
      };

      let handleAddAddress = async () => {
        try {
          let newAddressAdded = await addOrEditAddress({
            body: {
              address: {
                address: newAddress,
              },
            },
            method: "post",
          });
          if (newAddressAdded) {
            navigate("/profile");
          }
        } catch (error) {
          console.log(error);
        }
      };

      let handleEditAddress = async () => {
        try {
          const newAddressAdded = await addOrEditAddress({
            body: {
              address: {
                id: location?.state?.addressID,
                address: newAddress,
              },
            },
            method: "put",
          });
          if (newAddressAdded) {
            navigate("/profile");
          }
        } catch (error) {
          console.log(error);
        }
      };

      location.state ?  handleEditAddress() : handleAddAddress();
    },
  });

  return (
    <section className="container">
      <form className="medium-form-container">
        <legend className="legend">{location.state? "Edit your Address" :"Add new address"}</legend>
        <fieldset>
          {addressOption.map((options) => (
            <>
              <SCInput option={options} formik={formik} />{" "}
            </>
          ))}
        </fieldset>
        <PrimaryButton Action={location.state? "Edit Address" :"Add address"} onCLick={formik.handleSubmit} />
      </form>
    </section>
  );
}

export default AddAddress;
