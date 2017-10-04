import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TodoList from '../containers/TodoList';

export default () => (
  <Switch>
    <Route exact path="/" component={TodoList} />
  </Switch>
);
