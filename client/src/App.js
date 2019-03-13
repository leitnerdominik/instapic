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
} from '@fortawesome/free-solid-svg-icons';

import Instapic from './pages/Instapic/Instapic';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Logout from './pages/Logout/Logout';
import * as action from './store/actions/index';
import SinglePost from './pages/SinglePost/SinglePost';

library.add(
  faIgloo,
  faSignInAlt,
  faUserPlus,
  faUser,
  faExclamationTriangle,
  faHeart
);

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  };

  componentDidMount() {
    this.props.onCheckAuthState();
  }

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.props.onAuthSignUp(authData);
    // this.setState({ authLoading: true });
    // fetch('http://localhost:8080/auth/signup', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: authData.email,
    //     name: authData.name,
    //     password: authData.password,
    //     passwordConfirm: authData.passwordConfirm,
    //   }),
    // })
    //   .then(response => {
    //     if (response.status === 422) {
    //       throw new Error('Validation failed! Is the email already used?');
    //     }
    //     if (response.status === 401) {
    //       throw new Error('Passwords dont match!');
    //     }
    //     if (response.status !== 200 && response.status !== 201) {
    //       console.log(response);
    //       throw new Error('Signup failed!');
    //     }

    //     return response.json();
    //   })
    //   .then(jsonData => {
    //     console.log('Props: ', this.props);
    //     this.setState({ isAuth: false, authLoading: false });
    //     this.props.history.replace('/');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ error: err, authLoading: false, isAuth: false });
    //   });
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.props.onAuthLogin(authData);
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
  };

  autoLogout = timeMS => {
    setTimeout(() => {
      this.logoutHandler();
    }, timeMS);
  };

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
        <Route path="/logout" exact component={Logout} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
  }
}

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
