import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "antd";
import "../Styles/login.css";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("*Email is Required"),
      password: Yup.string()
        .min(8, "Password should be of minimum 8 characters")
        .required("*Password is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form>
      <fieldset className="cart-login-container">
        <legend>Login</legend>
        <label htmlFor="cart-login-email">Email Address:</label>
        <input
          type="email"
          name="email"
          id="cart-login-email"
          placeholder="Enter email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>
          {formik.touched.email && formik.errors.email ? (
            <>{formik.errors.email}</>
          ) : null}
        </p>
        <label htmlFor="cart-login-password">Password: </label>
        <input
          type="password"
          name="password"
          id="cart-login-password"
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>
          {formik.touched.password && formik.errors.password ? (
            <>{formik.errors.password}</>
          ) : null}
        </p>
      </fieldset>
      <Button
        type="primary"
        size="large"
        shape="round"
        className="btn cart-login-btn"
        onClick={formik.handleSubmit}
      >
        Login
      </Button>
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
