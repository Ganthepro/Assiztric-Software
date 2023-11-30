import React, { forwardRef } from "react";
import "./input.css";

const Input = forwardRef((props, ref) => {
  return (
    <div className="main-input">
      <label>{props.title}</label>
      {props.isBig ? (
        <textarea
          placeholder={props.placeholder}
          rows="4"
          cols="50"
          ref={ref}
        />
      ) : (
        <input
          type="text"
          placeholder={props.placeholder}
          size="50"
          ref={ref}
        />
      )}
    </div>
  );
});

export default Input;
