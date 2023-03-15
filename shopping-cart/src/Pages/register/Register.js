import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../../Components/button/PrimaryButton";
import SCInput from "../../Components/sc-input";
import useAuth from "../../Hooks/useAuth";
import { validationSchema } from "../register/Validation";
import "./login.css";


function Register() {
  const {registerUser} = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let isUserSignedUp=await registerUser({username:values.username, email:values.email, password:values.password})
        if (isUserSignedUp) {
          window.location.reload();
        }
      } catch (error) {
        console.log({error})
      }
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form>
      <fieldset className="cart-login-container">
        <legend>Register</legend>
        <SCInput
          label="Name: "
          type="text"
          name="username"
          id="cart-register-name"
          placeholder="Enter name"
          formik={formik}
        />
        <SCInput
          label="Email Address: "
          type="email"
          name="email"
          id="cart-register-email"
          placeholder="Enter email"
          formik={formik}
        />
        <SCInput
          label="Password: "
          type="password"
          name="password"
          id="cart-register-password"
          placeholder="Enter password"
          formik={formik}
        />
      </fieldset>
      <PrimaryButton Action="Register" onCLick={formik.handleSubmit}/>
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
