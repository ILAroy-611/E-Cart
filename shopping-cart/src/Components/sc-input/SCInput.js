import './scinput.css';

export default function SCInput({formik, name, type, placeholder, label, id}) {
    let field = formik.touched[name]
    let errors= formik.errors[name]

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
      <p>
        {field &&  errors ? (
          <>{errors}</>
        ) : null}
      </p>
    </>
  );
}
