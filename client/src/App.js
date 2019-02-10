import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authData.email,
        name: authData.name,
        password: authData.password,
        passwordConfirm: authData.passwordConfirm,
      }),
    })
      .then(response => {
        if (response.status === 422) {
          throw new Error('Validation failed! Is the email already used?');
        }
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Signup failed!');
        }

        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err, authLoading: false, isAuth: false });
      });
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then(response => {
        if (response.status === 422) {
          throw new Error('Validation failed.');
        }
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Authentication failed.');
        }

        return response.json();
      })
      .then(jsonData => {
        const { token, userId } = jsonData;

        this.setState({
          isAuth: true,
          token: token,
          authLoading: false,
          userId: userId,
        });

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        const remainingMs = 60 * 60 * 1000; // 1h
        const expiryDate = new Date(new Date.getTime() + remainingMs);
        localStorage.setItem('expiryDate', expiryDate.toIsoString());

        this.autoLogout(remainingMs);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
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
        <Route path="/login" exact component={Login} />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignUp
              onSignUp={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
