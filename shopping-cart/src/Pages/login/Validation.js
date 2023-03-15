import * as Yup from "yup";

export const validationSchema= Yup.object({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("*Email is Required"),
    password: Yup.string()
      .min(8, "Password should be of minimum 8 characters")
      .required("*Password is required"),
  })