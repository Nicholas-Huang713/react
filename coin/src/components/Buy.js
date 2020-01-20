import React from 'react';

class Buy extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: ""
        }
    }


    handleChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

    componentDidMount(){
        this.props.refreshBuy();
    }

     render() {
         const {value, coins, buyMessage} = this.props;
         return (
             <div>
                <h1>Buy MyCoins</h1>
                <p>Current MyCoin Value: ${value}.00</p>
                <p>Number of MyCoins Owned: {coins} </p>
                {buyMessage}
                <form onSubmit={this.props.updateBuy}>
                    <input type="number" 
                            name="amountBuy"
                            value={this.state.amount}
                            onChange={this.handleChange} />
                    <button>Buy</button>
                </form>
             </div>
         )
     }
}

export default Buy;