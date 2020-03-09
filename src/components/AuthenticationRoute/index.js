import React from 'react';
import Cookie from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

function AuthenticationRoute({ children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        Cookie.get('auth') ? (
          <Redirect
            to={{
              pathname: "/lobby",
              state: { from: location }
            }}
          />
        ) : (
            children
          )
      }
    />
  );
}

export default AuthenticationRoute;