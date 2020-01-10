import React from 'react';

class Buy extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: 0
        }
    }

    handleSubmit (event) {
        this.props.match.buy.updateBuy();
    }

    handleChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

     render() {
         const {value, coins} = this.props.match.params;
         return (
             <div>
                <h1>Buy MyCoins</h1>
                <p>Current MyCoin Value: ${value}.00</p>
                <p>Number of MyCoins Owned: {coins} </p>
                <form onSubmit={this.handleSubmit}>
                    <input type="number" 
                            value={this.state.amount}
                            onChange={this.handleChange} />
                    <button>Buy</button>
                </form>
             </div>
         )
     }
}

export default Buy;