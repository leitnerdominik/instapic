import React from 'react';
import { NavLink } from 'react-router-dom';

import Navigationitems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

import classes from './Navbar.module.css';

const navbar = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Logo}>
        <NavLink to="/"><Logo /></NavLink>
      </div>
      <Navigationitems />
    </div>
  );
};

export default navbar;
