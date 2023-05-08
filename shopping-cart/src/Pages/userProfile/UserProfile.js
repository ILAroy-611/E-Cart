import { useContext } from "react";
import ProfileCard from "../../Components/card/ProfileCard";
import counterContext from "../../Hooks/Context";

function UserProfile() {
  const { user } = useContext(counterContext);

  return (
    <div>
      <ProfileCard
        username={user?.username ?? user?.name}
        userImg={
          user?.image ??
          "https://t4.ftcdn.net/jpg/02/43/27/53/360_F_243275391_13fluVMJtkV7hnBxItx8D1Ac9MScUkQM.jpg"
        }
      />
    </div>
  );
}

export default UserProfile;
