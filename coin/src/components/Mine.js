import React from 'react';

class Mine extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            answer: ""
        }
    }


    handleChange = (event) => {
        this.setState({
            answer: event.target.value
        })
    }
    componentDidMount(){
        this.props.refreshMine();
    }

    render() {
        const {mineMessage} = this.props;
       

        return (
            <div>
                <h1>Mine Coins</h1>
                <p>Here you can mine MyCoins by being the first to solve the algorithm:</p>
                <p>What holiday is December 25th?</p>
                <p>{mineMessage}</p>
                <form onSubmit={this.props.updateMine}>
                    <input type="text" 
                            name="answerMine"
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