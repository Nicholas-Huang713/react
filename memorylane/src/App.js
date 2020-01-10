import React from 'react';
import "react-router";
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import State from './components/State';
import Prop from './components/Prop';
import Event from './components/Event';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
            <li><Link to="/">State</Link></li>
            <li><Link to="/prop">Prop</Link></li>
            <li><Link to="/event">Event</Link></li>
        </ul>
        <Route exact path="/" component={State} />
        <Route path="/prop" component={Prop} />                    
        <Route path="/event" component={Event} />
      </div>
    </BrowserRouter>
  );
}

export default App;
