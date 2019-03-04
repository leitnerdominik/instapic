import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Navigation/Navbar/Navbar';

import classes from './Layout.module.css';

class Layout extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { isAuth, children } = this.props;
    return (
      <Fragment>
        <Navbar isAuth={isAuth}/>
        <main className={classes.Layout}>{children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
  }
}

export default connect(mapStateToProps)(Layout);
