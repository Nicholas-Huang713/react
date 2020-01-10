import React from 'react';
import "react-router";
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Buy from './components/Buy';
import Sell from './components/Sell';
import Mine from './components/Mine';
import Browse from './components/Browse';


class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      coins: 0,
      ledger: [],
      service: []
    }
  }

  updateMine() {
    this.setState(prevState => ({
      value: prevState.value + 1,
      coins: prevState.coins + 1
    }))
  }

  updateBuy() {
    this.setState(prevState => ({
      value: prevState.value + 1,
      coins: prevState.coins + 1
    }));
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container text-center">
            <h1>Coin App</h1>
            <div className="btn-group btn-group-lg" role="group" aria-label="Button Navigation">
                <Link to="/"><button className="btn btn-outline-dark">Home</button></Link>
                <Link to={`/mine/${this.updateMine}`}><button className="btn btn-outline-dark">Mine Coins</button></Link>
                <Link to={`/buy/${this.state.value}/${this.state.coins}/${this.updateBuy}`}><button className="btn btn-outline-dark">Buy Coins</button></Link>
                <Link to={`/sell/${this.state.value}/${this.state.coins}`}><button className="btn btn-outline-dark">Sell Coins</button></Link>
                <Link to={`/browse/${this.state.ledger}`}><button className="btn btn-outline-dark">Browse Ledger</button></Link>
            </div>
          </div>
            <Route exact path="/" component={Home} />
            <Route path="/mine" render={props => <Mine updateMine = {this.updateMine} />} />                    
            <Route path="/buy/:value/:coins/:update" component={Buy} render={props => <Buy updateBuy = {this.updateBuy} />} />
            <Route path="/sell/:value/:coins" component={Sell} render={props => <Sell updateSell = {this.updateSell} />} />
            <Route path="/browse/:ledger" component={Browse} />
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
