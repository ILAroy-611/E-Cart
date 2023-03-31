import * as Yup from "yup";

const nameRegex= /^[A-Za-z]{2,}(\s?[A-Za-z0-9_])*$/ ;
const phoneRegex= /^\d{3}\d{3}\d{4}$/ ;
const pincodeRegex= /^\d{6}$/
export const validationSchema = Yup.object({
  name: Yup.string().required("*Name is required").matches(nameRegex, "Invalid Name, no special character (except _) are allowed"),
  sonOf: Yup.string(),
  mobNumber: Yup.string().matches(phoneRegex,"Phone number should be of 10 digits").required("*Phone number is required"),
  address1: Yup.string().required("*Address is required"),
  address2: Yup.string(),
  area: Yup.string(),
  district: Yup.string().required("*District is required").matches(/^[A-Za-z]{3,}$/,"Only alphabets allowed"),
  state: Yup.string().required("*State is required"),
  pinCode: Yup.string().required("*Pincode is required").matches(pincodeRegex, "Pincode must be of 6 digits"),
});
