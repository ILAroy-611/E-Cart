import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/button/PrimaryButton";
import SCInput from "../../Components/sc-input";
import useAuth from "../../Hooks/useAuth";
import { validationSchema } from "../register/Validation";
import { initialValues, registerOption } from "./helper";
import { useContext } from "react";
import counterContext from "../../Hooks/Context";
import "./login.css";

function Register() {
  const { authorizeUser } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useContext(counterContext);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        let response = await authorizeUser({
          body: {
            user: {
              username: values.username,
              email: values.email,
              password: values.password,
            },
          },
          url: `users`,
        });
        if (response?.data?.user) {
          setUser({ ...response.data.user });
          navigate("/");
        }
      } catch (error) {
        console.log({ error });
      }
    },
  });

  return (
    <form className="small-form-container">
      <fieldset>
        <legend className="legend">Register</legend>
        {registerOption.map((option) => (
          <SCInput option={option} formik={formik} />
        ))}
      </fieldset>
      <fieldset className="flex flex-justify">
        <PrimaryButton Action="Register" onCLick={formik.handleSubmit} />
        <p className="register-link-p">
          Already have an Account?{" "}
          <NavLink to="/login" className="link register-link">
            Login
          </NavLink>{" "}
        </p>
      </fieldset>
    </form>
  );
}

export default Register;
