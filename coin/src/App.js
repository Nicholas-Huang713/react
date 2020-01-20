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
import ItemDetails from './components/ItemDetails';

class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      coins: 0,
      ledger: [],
      mineMessage: "",
      buyMessage: "",
      sellMessage: ""
    }
    this.updateMine = this.updateMine.bind(this);
    this.updateBuy = this.updateBuy.bind(this);
    this.updateSell = this.updateSell.bind(this);
  }

  updateMine =(e) => {
    e.preventDefault();
    const answer = e.target.answerMine.value;
    console.log(answer);
    if(answer === "christmas"){
      this.setState(prevState => ({
        value: prevState.value + 1,
        coins: prevState.coins + 1
      }))
      const {value, coins, ledger} = this.state;
      const randID = Math.floor(Math.random() * 9999);
      const ledgerList = ledger.concat({id: randID, action: "Mined", amount: coins + 1, value: value + 1, actionAmt: 1})
      this.setState({
        mineMessage: "Correct!",
        ledger: ledgerList
      })
      console.log(this.state.ledger);
    }
    else{
      this.setState({
        mineMessage: "Wrong!"
      })
    }
  }

  updateBuy =(e) => {
    const {value, coins, ledger} = this.state;
    e.preventDefault();
    const amountBought = e.target.amountBuy.value;
    console.log(amountBought);
    if(amountBought === ""){
      this.setState({
        buyMessage: "Please enter a valid amount"
      })
    } else if(amountBought < 1){
      this.setState({
        buyMessage: "Please enter an amount greater than 0"
      })
    }
    else{
      this.setState(prevState => ({
        value: prevState.value + 1,
        coins: prevState.coins + parseInt(amountBought)
      }));
      const randID = Math.floor(Math.random() * 9999);
      const ledgerList = ledger.concat({id: randID, action: "Bought", amount: coins + 1, value: value +1, actionAmt: amountBought})
      this.setState({
        ledger: ledgerList
      })
      console.log(this.state.ledger);
    }
  }

  updateSell = (e) => {
    const {value, coins, ledger} = this.state;
    e.preventDefault();
    const amountSold = e.target.amountSell.value;
    console.log(amountSold);
    if(amountSold === ""){
      this.setState({
        sellMessage: "Please enter a valid amount"
      })
    } 
    else if(amountSold < 1){
      this.setState({
        sellMessage: "Please enter an amount greater than 0"
      })
    }
    else if(this.state.coins < amountSold){
      this.setState({
        sellMessage: "You do not have enough coins to sell"
      })
    }
    else{
      this.setState(prevState => ({
        value: prevState.value - 1,
        coins: prevState.coins - parseInt(amountSold),
      }));
      const randID = Math.floor(Math.random() * 9999);
      const ledgerList = ledger.concat({id: randID, action: "Sold", amount: coins - 1, value: value - 1, actionAmt: amountSold})
      this.setState({
        ledger: ledgerList
      })
    }
  }

  refreshMine = () => {
    this.setState({
      mineMessage: ""
    })
  } 
  refreshBuy = () => {
    this.setState({
      buyMessage: ""
    })
  } 
  refreshSell = () => {
    this.setState({
      sellMessage: ""
    })
  } 

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <h1>Coin App</h1>
            <div className="btn-group btn-group-lg text-center" role="group" aria-label="Button Navigation">
                <Link to="/"><button className="btn btn-outline-dark">Home</button></Link>
                <Link to="/mine"><button className="btn btn-outline-dark">Mine Coins</button></Link>
                <Link to="/buy"><button className="btn btn-outline-dark">Buy Coins</button></Link>
                <Link to="/sell"><button className="btn btn-outline-dark">Sell Coins</button></Link>
                <Link to="/browse"><button className="btn btn-outline-dark">Browse Ledger</button></Link>
            </div>
          </div>
            <Route exact path="/" component={Home} />
            <Route path="/mine" render={(props) => <Mine {...props} updateMine = {this.updateMine} refreshMine={this.refreshMine} mineMessage={this.state.mineMessage} />} />                    
            <Route path="/buy" render={(props) => <Buy {...props} updateBuy = {this.updateBuy} refreshBuy={this.refreshBuy} value={this.state.value} coins={this.state.coins} buyMessage ={this.state.buyMessage} />} />
            <Route path="/sell" render={(props) => <Sell {...props} updateSell = {this.updateSell} refreshSell={this.refreshSell} value={this.state.value} coins={this.state.coins} sellMessage={this.state.sellMessage} />} />
            <Route exact path="/browse" render={(props) => <Browse {...props} ledger={this.state.ledger} />} />
            <Route path="/browse/:index/:id" render={(props) => <ItemDetails {...props} ledger={this.state.ledger} />}/>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
