import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentSong : [],
      token: false
    }
  }
  insertToken = () => {
    this.setState({
      token: true
    })
  }
  removeToken = () => {
    localStorage.removeItem("token");
    this.setState({
      token: false
    })
    // this.props.history.push('/');
  }

  render() {
    const {token} = this.state;
    return (
      <div className="App"> 
        <div className="container">
          <div className="page-header border-dark border-bottom">
            <h1>Hip Hop History</h1>
            <p>Listen to the evolution of Hip Hop's sound.</p>
          </div>
          <Router>
            {
              token ? 
                <div className="container text-center mt-3">
                  <button className="btn btn-outline-dark" onClick={this.removeToken}>Logout</button>
                </div>
                :
                <div className="container text-center mt-3">
                  <div className="btn-group btn-group-lg" role="group" aria-label="Button Navigation">
                    <Link to="/login"><button type="button" className="btn btn-outline-dark">Login</button></Link>
                    <Link to="/register"><button type="button" className="btn btn-outline-dark">Register</button></Link>
                  </div>
                </div>
            }
            
            <Route exact path="/" component={Home} />
            <Route path="/login" render={(props) => <Login {...props} insertToken={this.insertToken} />} />
            <Route path="/register" render={(props) => <Registration {...props} insertToken={this.insertToken} />} />
            <PrivateRoute path="/protected" token={token} />
        </Router>
        </div>  
       
      </div>
    );
  }
  
}

export default App;
