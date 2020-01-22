import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import LoginReg from './components/LoginReg';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginHasClicked: false,
      homeHasClicked: true,
      signOutHasClicked: false
    }
  }

  onLoginClick = () => {
    this.setState({
      loginHasClicked: true,
      homeHasClicked: false,
      signOutHasClicked: false
    })
  }
  onHomeClick = () => {
    this.setState({
      loginHasClicked: false,
      homeHasClicked: true,
      signOutHasClicked: false
    })
  }
  onSignOutClick = () => {
    this.setState({
      loginHasClicked: false,
      homeHasClicked: false,
      signOutHasClicked: true
    })
  }

  render() {
    const {loginHasClicked, homeHasClicked} = this.state;
    let currentButton;
    if(homeHasClicked) {
      currentButton = <button onClick={this.onLoginClick}><Link to="/login">Login</Link> </button>
    }
    else if(loginHasClicked) {
      currentButton = <button onClick={this.onHomeClick}><Link to="/">Home</Link> </button>
    }
    else {
      currentButton = <button onClick={this.onSignOutClick}>Signout </button>
    }
    return (
      <div className="App">
        <div><h1>Login And Registration</h1></div>
        <Router> 
        {currentButton}    
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginReg} />     
          <Route path="/dashboard" component={Dashboard} />     
        </Router>
        
      </div>
    );
  }
  
}

export default App;
