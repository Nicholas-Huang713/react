import React from 'react';

class Buy extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: 0
        }
    }


    handleChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

     render() {
         const {value, coins} = this.props;
         return (
             <div>
                <h1>Buy MyCoins</h1>
                <p>Current MyCoin Value: ${value}.00</p>
                <p>Number of MyCoins Owned: {coins} </p>
                
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