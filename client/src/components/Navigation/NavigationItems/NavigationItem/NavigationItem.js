import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './NavigationItem.module.css';

const navigationItem = ({ link, text, icon, clicked }) => {
  const primary = [classes.Link];
  if (link === '/login') {
    primary.push(classes.Primary);
  }
  return (
    <li className={classes.Item}>
      {link ? (
        <NavLink to={link} className={primary.join(' ')} exact>
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </NavLink>
      ) : (
        <span className={classes.Button} onClick={clicked}>
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </span>
      )}
    </li>
  );
};

export default navigationItem;
