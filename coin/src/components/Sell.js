import React from 'react';

class Sell extends React.Component {
     render() {
        const {value, coins} = this.props;
         return (
             <div>
                <h1>Sell MyCoins</h1>
                <p>Current MyCoin Value: ${value}.00</p>
                <p>Number of MyCoins Owned: {coins}</p>

             </div>
         )
     }
}

export default Sell;