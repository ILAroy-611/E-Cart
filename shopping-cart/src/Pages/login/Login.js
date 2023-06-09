import { useFormik } from "formik";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SCInput from "../../Components/ui/sc-input";
import PrimaryButton from "../../Components/ui/button/PrimaryButton";
import useAuth from "../../Hooks/useAuth";
import { validationSchema } from "./Validation";
import { initialValues, loginOption } from "./helper";
import { useContext } from "react";
import counterContext from "../../Hooks/Context";
import "./login.css";

function Login() {
  const { authorizeUser } = useAuth();
  const navigate = useNavigate();
  const {state} = useLocation();
  const { setUser } = useContext(counterContext);
  
  const formik = useFormik({
    initialValues: initialValues,
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
          navigate(state?.path ?? "/");
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
