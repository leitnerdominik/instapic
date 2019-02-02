import React, { Fragment } from 'react';

import Navbar from '../Navigation/Navbar/Navbar';

import classes from './Layout.module.css';

const layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main className={classes.Layout}>{children}</main>
    </Fragment>
  );
};
export default layout;
