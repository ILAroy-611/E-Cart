import { Select, Space } from "antd";

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

const SCSelect = ({ formik, name }) => (
  <Space wrap>
    <Select
      // placeholder="Connect Frequency"
      defaultValue="all"
      style={{ width: 120 }}
      value={formik.values.gender}
      onChange={(value) => {
        formik.setFieldValue("gender", value);
      }}
      onBlur={formik.handleBlur}
      onSelect={formik.handleChange}
    >
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="all">All</Select.Option>
    </Select>
    {/* <Select
      name={name}
      defaultValue="all"
      style={{
        width: 140,
      }}
      onChange={(value) => {
        formik.setFieldValue("gender", value);
      }}
      options={formik.values.gender}
    /> */}
  </Space>
);
export default SCSelect;
