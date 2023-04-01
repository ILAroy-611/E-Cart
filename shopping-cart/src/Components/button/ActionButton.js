import { Button, Space } from "antd";
const ActionButton = ({ Action, onCLick }) => (
  <Space wrap>
    <Button onClick={onCLick}>{Action}</Button>
  </Space>
);
export default ActionButton;
