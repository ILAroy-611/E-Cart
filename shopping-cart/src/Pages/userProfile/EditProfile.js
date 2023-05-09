import { Avatar } from "antd";
import { useFormik } from "formik";
import PrimaryButton from "../../Components/button/PrimaryButton";
import SCInput from "../../Components/sc-input/SCInput";
import useAuth from "../../Hooks/useAuth";
import { getInitialValues, profileOptions } from "./helper";
import { useContext } from "react";
import counterContext from "../../Hooks/Context";
import { useNavigate } from "react-router-dom";
import "./editprofile.css";


function EditProfile() {

  const { updateUserInfo } = useAuth();
  const {user, setUser}= useContext(counterContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: getInitialValues(user) ,
    onSubmit: async (values) => {
      try {
        const response = await updateUserInfo({
          username: values.username,
          email: values.email,
          image: values.image,
        });
        if (response?.data?.user) {
          setUser({ ...response.data.user });
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleBack=()=>navigate('/profile');
  
  return (
    <form className="small-form-container edit-profile">
      <div>
      <Avatar
      className="edit-profile-image"
        src={
          formik.values?.image ??
          "https://t4.ftcdn.net/jpg/02/43/27/53/360_F_243275391_13fluVMJtkV7hnBxItx8D1Ac9MScUkQM.jpg"
        }
        alt="image"
        size={100}
      />
      </div>
      <div>
      {profileOptions.map((option) => (
        <SCInput formik={formik} option={option} />
      ))}
      </div>
      <div className="edit-profile-action flex flex-justify">
      <PrimaryButton Action="Edit Profile" onCLick={formik.handleSubmit} />
      <PrimaryButton Action="Back" onCLick={handleBack} />
      </div>
    </form>
  );
}

export default EditProfile;
