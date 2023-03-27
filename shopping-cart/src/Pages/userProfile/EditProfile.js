import { Avatar } from "antd";
import { useFormik } from "formik";
import PrimaryButton from "../../Components/button/PrimaryButton";
import SCInput from "../../Components/sc-input/SCInput";
import useAuth from "../../Hooks/useAuth";
import './editprofile.css'

function EditProfile() {
    const {updateUserInfo, user} = useAuth();
    const formik= useFormik({
        initialValues:{
            username:user.username,
            email:user.email,
            image:user.image,
            // username:JSON.parse(localStorage.getItem("user")).username,
        },
        onSubmit:async (values)=>{
            try{  
                updateUserInfo({username:values.username, email: values.email, image:values.image})
            }
            catch(error){
                console.error(error)
            }
        }
    })
  return (
    <form className="edit-profile-container">
      <Avatar src={formik.values?.image ?? "https://t4.ftcdn.net/jpg/02/43/27/53/360_F_243275391_13fluVMJtkV7hnBxItx8D1Ac9MScUkQM.jpg"} alt="image" size={100}/>
      <SCInput
        name="username"
        type="text"
        label="Name: "
        id="cart-edit-profile-name"
        formik={formik}
      />
      <SCInput
        name="email"
        type="email"
        label="Email Address: "
        id="cart-edit-profile-email"
        formik={formik}
      />
      <SCInput
        name="image"
        type="text"
        label="Image URL: "
        id="cart-edit-profile-image"
        formik={formik}
        placeholder={formik.values?.image ?? `No Image URL found`}
      />
      <PrimaryButton Action="Edit Profile" onCLick={formik.handleSubmit}/>
    </form>
  );
}

export default EditProfile;
