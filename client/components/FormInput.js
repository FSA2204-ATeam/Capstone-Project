import React, { useState } from 'react';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { toggleOpen, label, errorMessage, onChange, id, ...inputProps } =
    props;

  const handleFocus = (e) => {
    toggleOpen ? setFocused(true) : setFocused(false);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={(e) => [onChange(e), handleFocus(e)]}
        // onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};
export default FormInput;
