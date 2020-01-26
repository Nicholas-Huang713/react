import React from 'react';
import {Route, Redirect} from "react-router-dom";
import Dashboard from './Dashboard';

function PrivateRoute(props) {
    
  return (
    <Route
        render={() => 
            props.token ? (
                <Dashboard />
            ) : (
                <Redirect to="/" />
            )
        }
    />
  );
}

export default PrivateRoute;
