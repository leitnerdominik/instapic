import React from 'react';

import logoImg from '../../images/logo.png';

import classes from './Logo.module.css';

const logo = () => {
  return <img className={classes.Logo} src={logoImg} alt="logo" />;
};

export default logo;
