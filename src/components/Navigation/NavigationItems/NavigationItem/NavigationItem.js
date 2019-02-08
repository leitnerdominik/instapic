import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigationItem = ({ link, text, icon }) => {
  return (
    <li>
      <NavLink to={link} exact>
        <FontAwesomeIcon icon={icon} />
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

export default navigationItem;
