import React from 'react';


class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    updateCount() {
        this.setState(prevState => ({
            count: prevState.count + 1 
        }));
    }

    render() {
        let button;
        if(this.state.count > 14){
            button = <button className="btn btn-danger"
                        onClick={ () => this.updateCount() }>
                        Click Me        
                    </button>
        } else{
            button = <button className="btn btn-primary"
                        onClick={ () => this.updateCount() }>
                        Click Me        
                    </button>
        }
        
        return (
            <div className="jumbotron">
                <h1>Hello {this.props.name}</h1>
                {button}
                <h4>You clicked me {this.state.count} times</h4>
            </div>
        )
    }
}
export default Counter;