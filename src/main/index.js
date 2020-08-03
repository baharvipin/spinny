import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy } from 'react';


// ---------Lazy loading---------
// Import components here whose rendering is condionally
const Home = lazy(() => import('./home/Home'));

// Add every new route here which will be used with authentication.
const routes = [
  {
    path: '/home',
    exact: true,
    component: Home
  },
  {
    path: '*',
    render: () => <Redirect to="/home" />
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
