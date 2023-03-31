import { useFormik } from "formik";
import SCInput from "../../Components/sc-input/SCInput";
import useAddress from "../../Hooks/useAddress";
import "./editaddress.css";

function EditAddress() {
    const {address} = useAddress();
  const formik = useFormik({
    initialValues: {
      name: address.name,
      sonOf: address.sonOf,
      mobNumber: address.mobNumber,
      address1: address.address1,
      address2: address.address2,
      area: address.area,
      district: address.district,
      state: address.state,
      pinCode: address.pinCode,
    },

  });
  return (
    <div>
      <form className="form-container">
        <fieldset>
          <legend>Edit your address</legend>
          <SCInput
            label="Full Name: "
            type="text"
            name="name"
            id="cart-address-name"
            // placeholder="Enter full name"
            formik={formik}
          />
          <SCInput
            label="S/o: "
            type="text"
            name="sonOf"
            id="cart-address-sonOf"
            // placeholder="Son/Daughter of"
            formik={formik}
          />
          <SCInput
            label="Contact No.: "
            type="text"
            name="mobNumber"
            id="cart-address-contact"
            // placeholder="Provide contact number"
            formik={formik}
          />
          <SCInput
            label="Flat, House no., Building, Company, Apartment: "
            type="text"
            name="address1"
            id="cart-address-address1"
            // placeholder="Provide address"
            formik={formik}
          />
          <SCInput
            label="Area, Street, Sector, Village: "
            type="text"
            name="address2"
            id="cart-address-address2"
            // placeholder="Provide address"
            formik={formik}
          />
          <SCInput
            label="Landmark: "
            type="text"
            name="area"
            id="cart-address-area"
            // placeholder="Any Landmark?"
            formik={formik}
          />
          <SCInput
            label="District: "
            type="text"
            name="district"
            id="cart-address-district"
            // placeholder="Enter district's name"
            formik={formik}
          />
          <SCInput
            label="State: "
            type="text"
            name="state"
            id="cart-address-state"
            // placeholder="Enter your state"
            formik={formik}
          />
          <SCInput
            label="Pincode: "
            type="text"
            name="pincode"
            id="cart-address-pincode"
            // placeholder="Enter your pincode"
            formik={formik}
          />
        </fieldset>
      </form>
    </div>
  );
}

export default EditAddress;
