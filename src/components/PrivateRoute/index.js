import React from 'react';
import Cookie from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        Cookie.get('auth') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;