import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import LoginReg from './LoginReg';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: false
    }
  }
  
  insertToken = () => {
    this.setState({
      token: true
    })
  };

  removeToken = () => {
    this.setState({
      token: false
    })
  };

  render() {

    return (
      <div className="App">
        <div><h1>Login/Reg</h1></div>
        <Router> 
          <NavBar token={this.state.token} removeToken={this.removeToken}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" render={(props) => <LoginReg {...props} insertToken={this.insertToken} />} /> 
            <PrivateRoute path="/protected" token={this.state.token} />  
          </Switch>
        </Router>
        
      </div>
    );
  }
  
}

export default App;
