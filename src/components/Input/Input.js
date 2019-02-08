import React from 'react';

import classes from './Input.module.css';

const input = props => {
  const {
    id,
    label,
    value,
    type,
    errorMessage,
    control,
    required,
    onChange,
    onBlur,
  } = props;

  const inputClasses = [classes.InputField];

  // checken ob funkt
  let errorText = null;
  if (errorMessage.length > 0) {
    inputClasses.push(classes.InvalidInput);
    errorText = <span className={classes.ErrorText}>{errorMessage}</span>
  }


  return (
    <div className={classes.Input}>
      <label className={classes.InputText} htmlFor={id}>{label}</label>
      <input
        id={id}
        className={inputClasses.join(' ')}
        value={value}
        type={type}
        required={required}
        onChange={event => onChange(id, event.target.value)}
        onBlur={() => onBlur(id)}
      />
      {errorText}
    </div>
  );
};

export default input;
