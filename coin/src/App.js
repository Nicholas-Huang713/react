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
      service: [],
      mineMessage: ""
    }
    this.updateMine = this.updateMine.bind(this);
  }

  updateMine =(e) => {
    e.preventDefault();
    const answer = e.target.answerMine.value;
    console.log(answer);
    if(answer === "christmas"){
      this.setState(prevState => ({
        value: prevState.value + 1,
        coins: prevState.coins + 1,
      }))
      this.setState({
        mineMessage: "Correct!"
      })
    }
    else{
      this.setState({
        mineMessage: "Wrong!"
      })
    }
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
                <Link to="/mine"><button className="btn btn-outline-dark">Mine Coins</button></Link>
                <Link to="/buy"><button className="btn btn-outline-dark">Buy Coins</button></Link>
                <Link to="/sell"><button className="btn btn-outline-dark">Sell Coins</button></Link>
                <Link to="/browse"><button className="btn btn-outline-dark">Browse Ledger</button></Link>
            </div>
          </div>
            <Route exact path="/" component={Home} />
            <Route path="/mine" render={(props) => <Mine {...props} updateMine = {this.updateMine} mineMessage={this.state.mineMessage} />} />                    
            <Route path="/buy" render={(props) => <Buy {...props} updateBuy = {this.updateBuy} value={this.state.value} coins={this.state.coins} />} />
            <Route path="/sell" render={(props) => <Sell {...props} updateSell = {this.updateSell} value={this.state.value} coins={this.state.coins} />} />
            <Route path="/browse" component={Browse} />
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
