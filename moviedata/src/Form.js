import React from 'react';



// const axios = require('axios').default;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    handleChange = (event) => {
        const name = event.target.value;
        this.setState({
            name: name
        })
    }

    render() {
        return (
            <div className="jumbotron text-center">
                <form onSubmit={this.props.getMovie}>
                   <input type="text" 
                        name="movieName" 
                        value={this.state.name}  
                        onChange = {this.handleChange}
                        />
                   <button>Search</button> 
                </form>
            </div>
        )   
    }
}

export default Form;