import React from 'react';

class Mine extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            answer: "",
            message: ""
        }
    }
    
    handleSubmit = (event) => {
        
        const {answer} = this.state;
        if(answer === "christmas"){
            this.setState({
                message: "Correct!"
            })
            this.props.updateMine();
        } 
        else {
            this.setState({
                message: "Wrong. Try again!"
            })
        }
       
    }


    handleChange = (event) => {
        this.setState({
            answer: event.target.value
        })
    }
     render() {
         const {message} = this.state;
         return (
             <div>
                <h1>Mine Coins</h1>
                <p>Here you can mine MyCoins by being the first to solve the algorithm:</p>
                <p>What holiday is December 25th?</p>
                <p>{message}</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                           value={this.state.answer}
                           onChange={this.handleChange}
                           />
                    <button>Mine</button>
                </form>
             </div>
         )
     }
}

export default Mine;