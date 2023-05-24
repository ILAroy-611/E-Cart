import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/ui/button/PrimaryButton";
import SCInput from "../../Components/ui/sc-input";
import useAddress from "../../Hooks/useAddress";
import { validationSchema } from "./Validation";
import { addressOption, getInitialValues } from "./helper";
import "./addAddress.css";
import { useContext, useState } from "react";
import counterContext from "../../Hooks/Context";

function AddAddress() {
  const navigate = useNavigate();
  const { addOrEditAddress } = useAddress();
  const {address, setAddress} = useContext(counterContext);

  const {state} = useLocation();
  const initialValues = getInitialValues(state?.userAddress);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let newAddress={
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
          let response = await addOrEditAddress({
            body: {
              address: {
                address: newAddress ,
              },
            },
            method: "post",
          });
          // setAddress([...response.data.address]);
        } catch (error) {
          console.log(error);
        }finally{
          navigate("/address");
        }
      };

      let handleEditAddress = async () => {
        try {
          await addOrEditAddress({
            body: {
              address: {
                id: state?.addressID,
                address: newAddress,
              },
            },
            method: "put",
          });
        } catch (error) {
          console.log(error);
        }finally{
          navigate("/address");
        }
      };

      state!=null ? handleEditAddress() : handleAddAddress();
    },
  });

  return (
    <section className="container">
      <form className="medium-form-container">
        <legend className="legend">
          {state ? "Edit your Address" : "Add new address"}
        </legend>
        <fieldset>
          {addressOption.map((options) => (
            <>
              <SCInput option={options} formik={formik} />{" "}
            </>
          ))}
        </fieldset>
        <fieldset className="flex flex-justify">
          <PrimaryButton
            Action={state ? "Edit Address" : "Add address"}
            onCLick={formik.handleSubmit}
          />
          <PrimaryButton
            Action={"Go Back"}
            onCLick={() => navigate("/address")}
          />
        </fieldset>
      </form>
    </section>
  );
}

export default AddAddress;
