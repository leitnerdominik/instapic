import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faIgloo,
  faSignInAlt,
  faUserPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import Instapic from './pages/Instapic/Instapic';
import Login from './pages/Login/Login';

library.add(faIgloo, faSignInAlt, faUserPlus, faUser);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Instapic} />
        <Route path="/login" exact component={Login} />
      </Switch>
    );
  }
}

export default App;
