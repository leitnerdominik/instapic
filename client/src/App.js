import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faIgloo,
  faSignInAlt,
  faUserPlus,
  faUser,
  faExclamationTriangle,
  faHeart,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';

import Instapic from './pages/Instapic/Instapic';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Logout from './pages/Logout/Logout';
import SinglePost from './pages/SinglePost/SinglePost';
import Profile from './pages/Profile/Profile';
import * as action from './store/actions/index';

library.add(
  faIgloo,
  faSignInAlt,
  faUserPlus,
  faUser,
  faExclamationTriangle,
  faHeart,
  faUserTimes
);

class App extends Component {
  componentWillMount() {
    this.props.onCheckAuthState();
  }

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.props.onAuthSignUp(authData);
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.props.onAuthLogin(authData);
  };

  // logoutHandler = () => {
  //   this.setState({ isAuth: false, token: null });
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('expiryDate');
  // };

  // autoLogout = timeMS => {
  //   setTimeout(() => {
  //     this.logoutHandler();
  //   }, timeMS);
  // };

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Instapic} />
        <Route path="/post/:postId" exact component={SinglePost} />
        <Route
          path="/login"
          exact
          render={props => (
            <Login
              onLogin={this.loginHandler}
              loading={this.props.loading}
              error={this.props.error}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignUp
              {...props}
              onSignUp={this.signupHandler}
              loading={this.props.loading}
              error={this.props.error}
            />
          )}
        />
        <Route path="/profile" exact component={Profile} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthLogin: authData => dispatch(action.authLogin(authData)),
    onAuthSignUp: authData => dispatch(action.authSignUp(authData)),
    onCheckAuthState: () => dispatch(action.checkAuthState()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
