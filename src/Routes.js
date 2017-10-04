import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TodoLists from './containers/TodoLists';

export default () => (
  <Switch>
    <Route exact path="/" component={TodoLists} />
  </Switch>
);
