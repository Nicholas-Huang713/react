import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AllMusic from './components/AllMusic';
import DashBoard from './components/DashBoard';
import NavBar from './components/NavBar';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentSong : []
    }
  }

  renderPage = () => {
    this.forceUpdate();
  }

  // componentDidMount() {
  //   const jwt = getJwt();
  //   if(!jwt){
  //     this.setState({
  //       token: undefined
  //     });
  //   }
  //   this.setState({
  //     token: jwt
  //   })
  // }

  render() {
    return (
      <div className="App"> 
        <div className="container">
          <div className="page-header border-dark border-bottom">
            <h1>Hip Hop History</h1>
            <p>Listen to the evolution of Hip Hop's sound.</p>
          </div>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" render={(props) => <Login {...props} renderPage={this.renderPage} />} />
              <Route path="/register" render={(props) => <Registration {...props} renderPage={this.renderPage} />} />
              <PrivateRoute>
                <Route path='/dashboard' component={DashBoard} />
                <Route path='/browse' component={AllMusic} />
              </PrivateRoute>
            </Switch>
        </Router>
        </div>  
      </div>
    );
  }
  
}

export default App;
