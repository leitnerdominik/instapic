import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import * as actions from '../../store/actions/index';

import classes from './Layout.module.css';

class Layout extends Component {
  logoutHandler = () => {
    const { onLogout, onUserLogout, history } = this.props;
    onLogout();
    onUserLogout();
    history.replace('/');
    toast.info('Logged out!');
  };

  render() {
    const { isAuth, children } = this.props;
    return (
      <Fragment>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Navbar clicked={this.logoutHandler} isAuth={isAuth} />
        <main className={classes.Layout}>{children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout()),
  onUserLogout: () => dispatch(actions.userLogout()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Layout),
);
