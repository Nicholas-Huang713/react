import React from 'react';
import './App.css';
import Start from './components/Start';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentSong : []
    }
  }

  render() {
    return (
      <div className="App"> 
        <div className="container">
          <div className="page-header border-dark border-bottom">
            <h1>Hip Hop History</h1>
            <p>Listen to the evolution of Hip Hop's sound.</p>
          </div>
          <Start />
        </div>  
      </div>
    );
  }
  
}

export default App;
