import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faIgloo,
  faSignInAlt,
  faUserPlus,
  faUser,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

import Instapic from './pages/Instapic/Instapic';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

library.add(faIgloo, faSignInAlt, faUserPlus, faUser, faExclamationTriangle);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Instapic} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact render={props => <SignUp />} />
      </Switch>
    );
  }
}

export default App;
