export const profileOptions = [
  {
    label: "Name: ",
    type: "text",
    name: "username",
    id: "cart-edit-profile-name",
    placeholder: "",
  },
  {
    label: "Email Address: ",
    type: "email",
    name: "email",
    id: "cart-edit-profile-email",
    placeholder: "hi",
  },
  {
    name: "image",
    type: "text",
    label: "Image URL: ",
    id: "cart-edit-profile-image",
    placeholder: "No Image URL",
  },
];

export const getInitialValues=(user)=>{
  const initialValues={
    username: user.username,
    email: user.email,
    image: user.image,
  }
  return initialValues
}

// username:JSON.parse(localStorage.getItem("user")).username,
