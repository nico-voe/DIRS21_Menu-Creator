import { useState } from "react";
import "./Form.css";

const Form = ({ label, onChange, id, ...inputProps }) => {
  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} />
    </div>
  );
};

export default Form;
