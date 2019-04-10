import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faIgloo,
  faSignInAlt,
  faUserPlus,
  faUser,
  faExclamationTriangle,
  faUserTimes,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';

import Instapic from './pages/Instapic/Instapic';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import SinglePost from './pages/SinglePost/SinglePost';
import Profile from './pages/Profile/Profile';
import * as action from './store/actions/index';

library.add(
  faIgloo,
  faSignInAlt,
  faUserPlus,
  faUser,
  faExclamationTriangle,
  faUserTimes,
  faCopy,
  far,
);

class App extends Component {
  componentWillMount() {
    const { onCheckAuthState } = this.props;
    onCheckAuthState();
  }

  signupHandler = (event, authData) => {
    event.preventDefault();

    const { onAuthSignUp } = this.props;
    onAuthSignUp(authData);
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    const { onAuthLogin } = this.props;
    onAuthLogin(authData);
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
    const { loginLoading, loginError, signUpLoading, signUpError } = this.props;
    return (
      <Switch>
        <Route path="/" exact component={Instapic} />
        <Route path="/post/:postId" exact component={SinglePost} />
        <Route
          path="/login"
          exact
          render={() => (
            <Login
              onLogin={this.loginHandler}
              loading={loginLoading}
              error={loginError}
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
              loading={signUpLoading}
              error={signUpError}
            />
          )}
        />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  loginLoading: state.auth.loginLoading,
  loginError: state.auth.loginError,
  signUpLoading: state.auth.signUpLoading,
  signUpError: state.auth.signUpError,
});

const mapDispatchToProps = dispatch => ({
  onAuthLogin: authData => dispatch(action.authLogin(authData)),
  onAuthSignUp: authData => dispatch(action.authSignUp(authData)),
  onCheckAuthState: () => dispatch(action.checkAuthState()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
