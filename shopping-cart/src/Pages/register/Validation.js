import * as Yup from "yup";

const passwordRegex = /^[A-Za-z0-9_][A-Za-z0-9]{7,}$/;

export const validationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Name should have 6 or more characters")
    .required("*Name is required"),
  email: Yup.string().email().required("*Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters")
    .matches(
      passwordRegex,
      "Password should be alphanumric, _ can be used only once as first character"
    )
    .required("*Password is required"),
});
