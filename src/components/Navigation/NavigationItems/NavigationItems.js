import React, { Fragment } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navItems = [
  { id: 'login', text: 'Login', link: '/login' },
  { id: 'signup', text: 'Sign Up', link: '/signup' },
  { id: 'home', text: 'Home', link: '/' },
];

const navigationItems = () => {
  const navs = navItems.map(navItem => (
    <NavigationItem key={navItem.id} text={navItem.text} link={navItem.link} />
  ));
  return <Fragment>{navs}</Fragment>;
};

export default navigationItems;
