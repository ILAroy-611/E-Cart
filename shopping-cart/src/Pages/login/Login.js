import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import SCInput from "../../Components/sc-input";
import PrimaryButton from "../../Components/button/PrimaryButton";
import useAuth from "../../Hooks/useAuth";
import { validationSchema } from "./Validation";
import { loginOption } from "./helper";
import "./login.css";
import { useContext } from "react";
import counterContext from "../../Hooks/Context";

function Login() {
  // const { loginUser } = useAuth();
  const { authorizeUser } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useContext(counterContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let response = await authorizeUser({
          body: {
            user: {
              email: values.email,
              password: values.password,
            },
          },
          url: `users/login`,
        });
        if (response?.data?.user) {
          setUser({ ...response.data.user });
          navigate("/");
          // window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <form className="small-form-container">
      <fieldset>
        <legend className="legend">Login</legend>
        {loginOption.map((option) => (
          <SCInput option={option} formik={formik} />
        ))}
      </fieldset>
      <fieldset className="flex flex-justify">
        <PrimaryButton Action="Login" onCLick={formik.handleSubmit} />
        <p className="register-link-p">
          Don't have an Account?{" "}
          <NavLink to="/register" className="link register-link">
            Register
          </NavLink>{" "}
        </p>
      </fieldset>
    </form>
  );
}

export default Login;
