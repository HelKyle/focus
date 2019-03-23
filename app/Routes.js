import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TasksPage from './containers/TasksPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.TASKS} component={TasksPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
