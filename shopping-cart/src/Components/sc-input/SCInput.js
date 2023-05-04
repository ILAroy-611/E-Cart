import "./scinput.css";

export default function SCInput({ formik, option }) {
  const { name, type, placeholder, label, id } = option;
  let field = formik.touched[name];
  let errors = formik.errors[name];

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <p>{field && errors ? <>{errors}</> : null}</p>
    </>
  );
}
