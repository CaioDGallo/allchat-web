import React from 'react';
import Cookie from 'js-cookie';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ChatRoute({ children, ...rest }) {
  const socket = useSelector(state => state.socket);

    return (
      <Route
        {...rest}
        render={({ location }) =>
        Cookie.get('auth') && socket ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/lobby",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default ChatRoute;