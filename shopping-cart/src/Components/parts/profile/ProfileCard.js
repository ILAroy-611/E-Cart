import { EditFilled, SettingFilled } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { NavLink } from "react-router-dom";
import NewCard from "../../card/NewCard";
import "./profilecard.css";
const { Meta } = Card;

// https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png
const ProfileCard = ({ username, userImg }) => (
  <NewCard
    className="cart-user-profile-card"
    bordered={true}
    card_style={{ maxWidth:'45%',
    border: "1px solid black",
  margin:'2rem auto' }}
    card_actions={[
      <NavLink to="/settings">
        <SettingFilled key="setting" className="profile-setting-icon" />
      </NavLink>,
      <NavLink to="/edit-profile">
        <EditFilled key="edit" className="profile-edit-icon" />
      </NavLink>,
    ]}
    card_title=""
    card_cover={<img alt="cover" src={userImg} height="400px" width="200px" />}
    meta={{
      meta_title: username,
      meta_description: `Welcome ${username}`,
      meta_avatar:
        userImg ??
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB61TjlBXuRQcAeKurz2-JmKOXy72HChFYD39017Y2g&s",
      meta_avatarShape: "",
      meta_avatarSize: 55,
    }}
  ></NewCard>
  // <Card
  //   className="cart-user-profile-card"
  //   hoverable
  //   bordered
  //   cover={<img alt="cover" src={userImg} height="400px" width="200px" />}
  //   actions={[
  //     <NavLink to="/settings" >
  //       <SettingFilled key="setting" className="profile-setting-icon"/>
  //     </NavLink>,
  //     <NavLink to="/edit-profile">
  //       <EditFilled key="edit" className="profile-edit-icon" />
  //     </NavLink>,
  //   ]}
  // >
  //   <Meta
  //     avatar={<Avatar src={userImg} size={55} />}
  //     title={username}
  //     description={`Welcome ${username}`}
  //   />
  // </Card>
);
export default ProfileCard;
