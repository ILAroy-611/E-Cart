import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/button/PrimaryButton";
import SCInput from "../../Components/sc-input/SCInput";
import useAddress from "../../Hooks/useAddress";
import { validationSchema } from "./Validation";
import "./addAddress.css";


function AddAddress() {
  const navigate = useNavigate();
  const {addAddress} = useAddress();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      sonOf: "",
      mobNumber: "",
      address1: "",
      address2: "",
      area: "",
      district: "",
      state: "",
      pinCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let newAddressAdded= await addAddress({
          name: values.name,
          sonOf: values.sonOf,
          mobNumber: values.mobNumber,
          address1: values.address1,
          address2: values.address2,
          area: values.area,
          district: values.district,
          state: values.state,
          pinCode: values.pinCode,
        });
        if(newAddressAdded){
          navigate('/profile')
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="form-container container">
      <form>
        <legend>Add a new address</legend>
        <fieldset>
          <SCInput
            label="Full Name: "
            type="text"
            name="name"
            id="cart-address-name"
            placeholder="Enter full name"
            formik={formik}
          />
          <SCInput
            label="S/o: "
            type="text"
            name="sonOf"
            id="cart-address-sonOf"
            placeholder="Son/Daughter of"
            formik={formik}
          />
          <SCInput
            label="Contact No.: "
            type="text"
            name="mobNumber"
            id="cart-address-contact"
            placeholder="Provide contact number"
            formik={formik}
          />
          <SCInput
            label="Flat, House no., Building, Company, Apartment: "
            type="text"
            name="address1"
            id="cart-address-address1"
            placeholder="Provide address"
            formik={formik}
          />
          <SCInput
            label="Area, Street, Sector, Village: "
            type="text"
            name="address2"
            id="cart-address-address2"
            placeholder="Provide address"
            formik={formik}
          />
          <SCInput
            label="Landmark: "
            type="text"
            name="area"
            id="cart-address-area"
            placeholder="Any Landmark?"
            formik={formik}
          />
          <SCInput
            label="District: "
            type="text"
            name="district"
            id="cart-address-district"
            placeholder="Enter district's name"
            formik={formik}
          />
          <SCInput
            label="State: "
            type="text"
            name="state"
            id="cart-address-state"
            placeholder="Enter your state"
            formik={formik}
          />
          <SCInput
            label="Pincode: "
            type="text"
            name="pinCode"
            id="cart-address-pincode"
            placeholder="Enter your pincode"
            formik={formik}
          />
        </fieldset>
        <PrimaryButton Action="Add address" onCLick={formik.handleSubmit} />
      </form>
    </section>
  );
}

export default AddAddress;
