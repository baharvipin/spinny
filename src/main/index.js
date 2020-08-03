import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy } from 'react';

// ---------Lazy loading---------
// Import components here whose rendering is condionally
const Naruto = lazy(() => import('./naruto/Naruto'));

// Add every new route here which will be used with authentication.
const routes = [
  {
    path: '/naruto',
    exact: true,
    component: Naruto
  },
  {
    path: '*',
    render: () => <Redirect to="/naruto" />
  }
];

export default function() {
  return (
    <div>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </div>
  );
}
