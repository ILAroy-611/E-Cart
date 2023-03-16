import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import SCInput from "../../Components/sc-input";
import PrimaryButton from "../../Components/button/PrimaryButton";
import useAuth from "../../Hooks/useAuth";
import { validationSchema } from "./Validation";
import "./login.css";


function Login() {
  const { loginUser } = useAuth();
  const navigate= useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let isUserLoggedIn = await loginUser({
          email: values.email,
          password: values.password,
        });
        if (isUserLoggedIn) {
          navigate('/')
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <form>
      <fieldset className="cart-login-container">
        <legend>Login</legend>
        <SCInput
          label="Email Address: "
          type="email"
          name="email"
          id="cart-login-email"
          placeholder="Enter email"
          formik={formik}
        />
        <SCInput
          label="Password: "
          type="password"
          name="password"
          id="cart-login-password"
          placeholder="Enter password"
          formik={formik}
        />
      </fieldset>
      <PrimaryButton Action="Login" onCLick={formik.handleSubmit} />
      <p className="register-link-p">
        Don't have an Account?{" "}
        <NavLink to="/register" className="link register-link">
          Register
        </NavLink>{" "}
      </p>
    </form>
  );
}

export default Login;
