import React from 'react';

class Sell extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            amount: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }
    componentDidMount(){
        this.props.refreshSell();
    }
     render() {
        const {value, coins, sellMessage} = this.props;
         return (
             <div>
                <h1>Sell MyCoins</h1>
                <p>Current MyCoin Value: ${value}.00</p>
                <p>Number of MyCoins Owned: {coins}</p>
                {sellMessage}
                <form onSubmit={this.props.updateSell}>
                    <input type="number" 
                            name="amountSell"
                            value={this.state.amount}
                            onChange={this.handleChange}
                            />
                    <button>Sell</button>
                </form>
             </div>
         )
     }
}

export default Sell;