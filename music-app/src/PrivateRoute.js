import React from 'react';
import {Route, Redirect} from "react-router-dom";
import AllMusic from './AllMusic';

class PrivateRoute extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: false
    }
  }
  // componentDidMount() {
  //   const token = localStorage.getItem("token");
  //   this.setState({
  //     token
  //   })
  // }
  render(){
    const {token} = this.state;
    return (
      <Route
          render={() => 
              localStorage.getItem("token") ? (
                  <AllMusic />
              ) : (
                  <Redirect to="/" />
              )
          }
      />
    );
  }
  
}

export default PrivateRoute;
