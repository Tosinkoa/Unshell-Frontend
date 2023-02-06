import { useField } from "formik"

export default function MyInput({ label, labelClassName, ...props }) {
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className={`${labelClassName ? labelClassName : "mylabel"}`}>{label}</label>
      <input {...field} {...props} />

      {meta.touched && meta.error ? <div className="form_error">{meta.error}</div> : ""}
    </>
  )
}
