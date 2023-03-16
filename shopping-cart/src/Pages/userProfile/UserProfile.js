import ProfileCard from "../../Components/card/ProfileCard";

function UserProfile() {
  const name= JSON.parse(localStorage.getItem("user")).username
  const user_img= JSON.parse(localStorage.getItem("user"))?.image ?? "https://t4.ftcdn.net/jpg/02/43/27/53/360_F_243275391_13fluVMJtkV7hnBxItx8D1Ac9MScUkQM.jpg"
  return (
    <div>
      <ProfileCard
        username={name}
        userImg={user_img}
      />
    </div>
  );
}

export default UserProfile;
