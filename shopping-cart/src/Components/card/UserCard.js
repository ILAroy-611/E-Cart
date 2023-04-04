// import "./usercard.css";
import { Avatar, Card, Space } from "antd";
import { BiBlock } from "react-icons/bi";
import { ImUnlocked } from "react-icons/im";
import ActionButton from "../button/ActionButton";
import useAdminPriv from "../../Hooks/useAdminPriv";

const { Meta } = Card;
function UserCard({userDetail}) {
  // console.log(userDetail);
  const {blockUsers,unblockUsers}= useAdminPriv();

  const handleBlockUser= async(userID)=>{
    try{
      await blockUsers(userID);
      alert(`${userDetail?.name ?? userDetail?.email} has been blocked`)
    }
    catch(error){
      console.log(error);
    }
  }
  
  const handleUnBlockUser= async(userID)=>{
    try{
      await unblockUsers(userID);
      alert(`${userDetail?.name ?? userDetail?.email} has been unblocked`)
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <Space direction="vertical" size={16}>
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        actions={[
          <ActionButton Action={<BiBlock key="block" />} onCLick={()=>handleBlockUser(userDetail.id)}></ActionButton>,
          <ActionButton Action={<ImUnlocked key="unblock"/>} onCLick={()=>handleUnBlockUser(userDetail.id)}></ActionButton>,
        //   <EllipsisOutlined key="ellipsis" />,
        ]}
      >
          <Meta
            avatar={<Avatar src={userDetail?.image ?? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB61TjlBXuRQcAeKurz2-JmKOXy72HChFYD39017Y2g&s`} />}
            title={userDetail.username}
            description={userDetail.email}
          />
      </Card>
    </Space>
  );
}

export default UserCard;
