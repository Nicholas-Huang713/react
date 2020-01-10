import React from 'react';

const withCoin = WrappedComponent => {
    class WithCoin extends React.Component {
        constructor(props){
            super(props);
            this.state= {
                
            }
        }
        render() {
            return (
                <WrappedComponent coins= { }/>
            )
        }
    }
    return WithCoin;
}