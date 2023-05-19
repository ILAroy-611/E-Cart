import { Select, Space } from "antd";
import './select.css'
// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

const SCSelect = ({ formik, name, options }) => (
  <Space wrap>
    <Select
      // defaultValue="all"
      style={{ width: 120 }}
      value={formik.values[name]}
      onChange={(value) => {
        formik.setFieldValue("gender", value);
      }}
      onBlur={formik.handleBlur}
      onSelect={formik.handleChange}
    >

      {options.map(gender=>{
        return(
          <Select.Option value={gender} className="select-values">{gender}</Select.Option>
        )
      })}

      {/* <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="all">All</Select.Option> */}
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
