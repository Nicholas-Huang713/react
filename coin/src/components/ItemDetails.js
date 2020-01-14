import React from 'react';

class ItemDetails extends React.Component {

     render() {
        const {ledger} = this.props;
        console.log(ledger[0])
        // console.log(this.props.match.params.id)
        // const data = ledger.forEach((item)=> {
        //     if(item.id === this.props.match.params.id){
        //         return {item}
        //     }
        // })
        // let data;
        // for(var i = 0; i < ledger.length; i ++){
        //     if(ledger[i].id === this.props.match.params.id){
        //         data = ledger[i];
        //     }
        // }
        // console.log(data);
         return (
             <div className="container">
                
             </div>
         )
     }
}

export default ItemDetails;