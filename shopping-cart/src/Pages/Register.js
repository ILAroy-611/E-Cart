import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import * as Yup from "yup";
import "../Styles/login.css";

function Register() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name should have 3 or more characters")
        .required("*Name is required"),
      email: Yup.string().email().required("*Email is required"),
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
        <legend>Register</legend>
        <label htmlFor="cart-register-name">Name: </label>
        <input
          type="text"
          name="name"
          id="cart-register-name"
          placeholder="Enter name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>
        {formik.touched.name && formik.errors.name ? (
          <>{formik.errors.name}</>
        ) : null}
        </p>
        <label htmlFor="cart-register-email">Email Address: </label>
        <input
          type="email"
          name="email"
          id="cart-register-email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>
        {formik.touched.email && formik.errors.email ? (
          <>{formik.errors.email}</>
        ) : null}
        </p>
        <label htmlFor="cart-register-password">Password: </label>
        <input
          type="password"
          name="password"
          id="cart-register-password"
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
        Register
      </Button>
      <p className="register-link-p">
        Already have an Account?{" "}
        <NavLink to="/login" className="link register-link">
          Login
        </NavLink>{" "}
      </p>
    </form>
  );
}

export default Register;
