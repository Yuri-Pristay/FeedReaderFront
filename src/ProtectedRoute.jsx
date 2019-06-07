import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import http from './api/http';

const ProtectedRoute = ({ component: Component, ...protectedRouteProps }) => (
  <Route
    {...protectedRouteProps}
    render={props => (
      (http.getToken() ? <Component {...props} /> : (
        <Redirect to={{
          pathname: '/auth',
        }}
        />
      ))
    )}
  />
);

export default ProtectedRoute;
