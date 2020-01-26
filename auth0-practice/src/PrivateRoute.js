import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth0Client from './Auth';

function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth0Client.isAuthenticated ? (
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
