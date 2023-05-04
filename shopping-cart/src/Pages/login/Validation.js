import * as Yup from "yup";

const passwordRegex= /^[A-Za-z0-9_][A-Za-z0-9]{7,}$/

export const validationSchema= Yup.object({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("*Email is Required"),
    password: Yup.string()
      .min(8, "Password should be of minimum 8 characters")
      .required("*Password is required")
      .matches(passwordRegex, 'Password should be alphanumric, _ can be used only once as first character'),
  })