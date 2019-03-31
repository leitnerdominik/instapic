import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigationItem = ({ link, text, icon, clicked }) => {
  return (
    <li>
      {link ? (
        <NavLink to={link} exact>
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </NavLink>
      ) : (
        <span onClick={clicked}>
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </span>
      )}
    </li>
  );
};

export default navigationItem;
