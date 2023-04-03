import { Button, Space } from "antd";
import './actionbutton.css'

const ActionButton = ({ Action, onCLick }) => (
  <Space wrap>
    <Button onClick={onCLick} className="action-btn">{Action}</Button>
  </Space>
);
export default ActionButton;
