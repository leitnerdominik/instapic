import React from 'react';

import classes from './Input.module.css';

const input = props => {
  const {
    id,
    label,
    value,
    type,
    valid,
    touched,
    control,
    required,
    onChange,
    onBlur,
  } = props;

  const inputClasses = [classes.Input];

  // checken ob funkt
  if (!valid) {
    inputClasses.push(classes.Invalid);
  }
  if (touched) {
    inputClasses.push(classes.Touched);
  }

  return (
    <div className={inputClasses.join(' ')}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={inputClasses.join(' ')}
        value={value}
        type={type}
        required={required}
        onChange={event => onChange(id, event.target.value)}
        onBlur={() => onBlur(id)}
      />
    </div>
  );
};

export default input;
