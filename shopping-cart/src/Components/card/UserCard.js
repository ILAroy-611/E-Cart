// import "./usercard.css";
import { Avatar, Card, Space } from "antd";
import { BiBlock } from "react-icons/bi";
import { ImUnlocked } from "react-icons/im";

const { Meta } = Card;
function UserCard({userDetail}) {
  return (
    <Space direction="vertical" size={16}>
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        actions={[
          <BiBlock key="block" />,
          <ImUnlocked key="unblock" />,
        //   <EllipsisOutlined key="ellipsis" />,
        ]}
      >
          <Meta
            avatar={<Avatar src={userDetail?.image ?? `https://joesch.moe/api/v1/random?key=2`} />}
            title={userDetail.username}
            description={userDetail.email}
          />
      </Card>
    </Space>
  );
}

export default UserCard;
