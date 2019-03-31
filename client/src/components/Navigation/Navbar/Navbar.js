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
    id: 'profile',
    text: 'Profile',
    link: '/profile',
    icon: 'user',
    auth: true,
  },
  {
    id: 'logout',
    text: 'logout',
    icon: 'user-times',
    auth: true,
  },
];

const navbar = ({ isAuth, clicked }) => {
  const navItems = items.filter(item => {
    if ((isAuth && item.auth) || (!isAuth && !item.auth)) {
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
      <Navigationitems clicked={clicked} navItems={navItems} />
    </div>
  );
};

export default navbar;
