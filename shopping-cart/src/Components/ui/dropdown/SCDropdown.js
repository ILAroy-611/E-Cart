import { Dropdown, Space } from "antd";


const SCDropdown = ({items, placement, mainEle}) => (
  <>
    <Dropdown
      menu={{
        items,
      }}
      placement={placement}
      arrow
    >
      <a onClick={(e) => e.preventDefault()}>
      <Space>
        {mainEle}
        {/* <DownOutlined /> */}
      </Space>
    </a>
    </Dropdown>
  </>
);
export default SCDropdown;
