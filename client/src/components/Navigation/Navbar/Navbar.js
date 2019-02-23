import React from 'react';
import { NavLink } from 'react-router-dom';

import Navigationitems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

import classes from './Navbar.module.css';

const items = [
  {
    id: 'login',
    text: 'Login',
    link: '/login',
    icon: 'sign-in-alt',
    auth: false,
  },
  {
    id: 'signup',
    text: 'Sign Up',
    link: '/signup',
    icon: 'user-plus',
    auth: false,
  },
  {
    id: 'logout',
    text: 'logout',
    link: '/logout',
    icon: 'user-plus',
    auth: true,
  },
  {
    id: 'profile',
    text: 'Profile',
    link: '/profile',
    icon: 'user',
    auth: true,
  },
];

const navbar = ({ isAuth }) => {
  const navItems = items.filter(item => {
    if (isAuth && item.auth) {
      return true;
    } else if (!isAuth && !item.auth) {
      return true;
    }
    return false;
  });
  return (
    <div className={classes.Container}>
      <div className={classes.Logo}>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <Navigationitems navItems={navItems} />
    </div>
  );
};

export default navbar;
