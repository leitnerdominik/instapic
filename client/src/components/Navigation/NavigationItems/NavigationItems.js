import React, { Fragment } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = ({ navItems, clicked }) => {
  const navs = navItems.map(navItem => (
    <NavigationItem
      key={navItem.id}
      text={navItem.text}
      link={navItem.link}
      icon={navItem.icon}
      clicked={clicked}
    />
  ));
  return (
    <Fragment>
      <ul className={classes.NavItems}>{navs}</ul>
    </Fragment>
  );
};

export default navigationItems;
