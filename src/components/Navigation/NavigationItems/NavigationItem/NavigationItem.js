import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigationItem = ({ link, text, icon }) => {
  return (
    <li>
      <FontAwesomeIcon icon={icon} />
      <NavLink to={link} exact>
        {text}
      </NavLink>
    </li>
  );
};

export default navigationItem;
