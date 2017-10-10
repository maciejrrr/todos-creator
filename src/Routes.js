import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Board from './containers/Board';

export default () => (
  <Switch>
    <Route exact path="/" component={Board} />
  </Switch>
);
