import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to="/">
          <Logo />
          <span>Instapic</span>
        </Link>
      </div>
      <Navigationitems clicked={clicked} navItems={navItems} />
    </div>
  );
};

export default navbar;
