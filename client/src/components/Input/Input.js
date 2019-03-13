import React from 'react';

import classes from './Input.module.css';

const input = props => {
  const {
    id,
    label,
    value,
    type,
    valid,
    errorMessage,
    control,
    onChange,
    onBlur,
  } = props;

  const inputClasses = [classes.InputField];

  // checken ob funkt
  // console.log(errorMessage)
  let errorText = null;
  if (errorMessage && !valid) {
    inputClasses.push(classes.InvalidInput);
    errorText = <span className={classes.ErrorText}>{errorMessage}</span>;
  } else if (valid) {
    inputClasses.push(classes.ValidInput);
  }

  let field = (
    <input
      id={id}
      className={inputClasses.join(' ')}
      value={value}
      type={type}
      onChange={event => onChange(id, event.target.value)}
      onBlur={onBlur ? () => onBlur(id) : null} // TODO: besser loesen
    />
  );

  if (control === 'filepicker') {
    field = (
      <input
        id={id}
        className={inputClasses.join(' ')}
        type={type}
        onChange={event => onChange(id, event.target.value, event.target.files)}
      />
    );
  }

  if (control === 'textarea') {
    field = (
      <textarea
        id={id}
        className={inputClasses.join(' ')}
        value={value}
        rows="5"
        onChange={event => onChange(id, event.target.value)}
      />
    );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.InputText} htmlFor={id}>
        {label}
      </label>
      {field}
      {errorText}
    </div>
  );
};

export default input;
