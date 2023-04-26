import { Card } from "antd";
import "./basiccard.css";
import { NavLink } from "react-router-dom";

function BasicCard({ card_title, card_content, path }) {
  return (
    <NavLink to={path} className="link">
      <Card title={card_title} bordered={true} hoverable style={{ width: 240 }}>
        <p>{card_content}</p>
      </Card>
    </NavLink>
  );
}

export default BasicCard;
