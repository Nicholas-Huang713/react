import React from 'react';
import {Link} from 'react-router-dom';

class Browse extends React.Component {

     render() {
         const {ledger} = this.props;
         console.log(ledger);
         return (
             <div className="container">
                 <h1>Browse the Ledger</h1>
                <p>Here you can browse all MyCoin transactions.</p>
                <h3>MyCoin Ledger</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Amount</th> 
                            <th>Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledger.map((item, index)=> {
                            return <tr key={item.id}>
                                        <td>{item.action}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.value}</td>
                                        <td><Link to={`/browse/${index}/${item.id}`}>Details</Link></td>
                                    </tr>
                        })
                        }
                    </tbody>
                    
                </table>
             </div>
         )
     }
}

export default Browse;