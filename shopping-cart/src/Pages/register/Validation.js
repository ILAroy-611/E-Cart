import * as Yup from "yup";

export const validationSchema= Yup.object({
    username: Yup.string()
      .min(3, "Name should have 3 or more characters")
      .required("*Name is required"),
    email: Yup.string().email().required("*Email is required"),
    password: Yup.string()
      .min(8, "Password should be of minimum 8 characters")
      .required("*Password is required"),
  })