import React from 'react';

class ItemDetails extends React.Component {

     render() {
        const {ledger} = this.props;
        const index = this.props.match.params.index;
        const data = ledger[index];
        const trans = parseInt(index) + parseInt(1);

         return (
             <div className="container">
                <h2>Ledger Transaction Details</h2>
                <p>Detailed view of a transaction from ledger.</p>
                <div className="container border border-dark">
                    <h3><u>Transaction # <b>{trans}</b></u></h3>
                    <h4>ID: {data.id}</h4>
                    <h4><b>{data.action} {data.actionAmt}</b> MyCoins</h4>
                </div>
             </div>
         )
     }
}

export default ItemDetails;