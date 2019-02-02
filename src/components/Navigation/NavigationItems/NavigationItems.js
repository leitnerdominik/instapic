import React, { Fragment } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navItems = [
  { id: 'login', text: 'Login', link: '/login', icon: 'sign-in-alt' },
  { id: 'signup', text: 'Sign Up', link: '/signup', icon: 'user-plus' },
  { id: 'profile', text: 'Profile', link: '/profile', icon: 'user' },
];

const navigationItems = () => {
  const navs = navItems.map(navItem => (
    <NavigationItem key={navItem.id} text={navItem.text} link={navItem.link} icon={navItem.icon} />
  ));
  return (
    <Fragment>
      <ul className={classes.NavItems}>{navs}</ul>
    </Fragment>
  );
};

export default navigationItems;
