import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = ({ link, text }) => {
  return (
    <li>
      <NavLink to={link} exact>
        {text}
      </NavLink>
    </li>
  );
};

export default navigationItem;
