import { EditFilled, SettingFilled } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { NavLink } from "react-router-dom";
import "./profilecard.css";
const { Meta } = Card;

// https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png
const ProfileCard = ({ username, userImg }) => (
  <Card
    className="cart-user-profile-card"
    hoverable
    bordered
    cover={<img alt="cover" src={userImg} height="400px" width="200px" />}
    actions={[
      <NavLink to="/settings" >
        <SettingFilled key="setting" className="profile-setting-icon"/>
      </NavLink>,
      <NavLink to="/edit-profile">
        <EditFilled key="edit" className="profile-edit-icon" />
      </NavLink>,
    ]}
  >
    <Meta
      avatar={<Avatar src={userImg} size={55} />}
      title={username}
      description={`Welcome ${username}`}
    />
  </Card>
);
export default ProfileCard;
