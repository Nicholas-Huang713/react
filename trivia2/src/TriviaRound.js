import React from 'react';

import TriviaCard from './TriviaCard';

class TriviaRound extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            count: 0,
            score: 0,
            message: "",
            hasClicked: false,
        }
    }

    handleClick () {
        this.setState({
            hasClicked: true
        });
    }

    render() {
        let buttons = this.props.question.answers.map((question)=> {
            return <button key={question.isCorrect} onClick={() => this.handleClick() }> {question.value} </button>
        })
        let message;

        if(this.state.hasClicked){
            buttons = null;
            message = "Correct"
        }

        let card = this.props.question;

        return (
            <div className="container">
            <h1>{this.state.count}</h1>
            <div className="text-center"> 
                <TriviaCard info={card}/>
                <h2>{message}</h2>
                {buttons}
                {this.state.name}
            </div>
                
            </div>
            
        )
    }

    componentDidMount(){
        this.myInterval = setInterval(() => {
          this.setState(prevState => ({
            count: prevState.count + 1
          }))
        }, 1000)
      }
    
      componentWillUnmount() {
        clearInterval(this.myInterval)
      }
}

export default TriviaRound;
