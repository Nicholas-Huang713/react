import React from 'react';

class Language extends React.Component {
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

    render(){
        return (
            <div className="container text-center">
                {this.state.count} {this.props.name} <button onClick={() => this.updateCount()}> + </button>
            </div>
        )
    }
}

export default Language;