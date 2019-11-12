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

    handleRightClick () {
        clearInterval(this.myInterval);
        if(this.state.count <= 10){
            this.setState({
                message: "Correct! Score +5",
                hasClicked: true
            });
            this.setState(prevState => ({
                score: prevState.score + 5
            }));
        } else if(this.state.count <= 20) {
            this.setState({
                message: "Correct! Score +3",
                hasClicked: true
            });
            this.setState(prevState => ({
                score: prevState.score + 3
            }));
        } else {
            this.setState({
                message: "Correct! Score +1",
                hasClicked: true
            });
            this.setState(prevState => ({
                score: prevState.score + 1
            }));
        }
        // if(TriviaCard.state.hasClicked){
        //     this.setState(prevState => ({
        //         score: prevState.score - 1
        //     }));
        // }
        
        
    }

    handleWrongClick () {
        this.setState({
            message: "Wrong"
        });
        clearInterval(this.myInterval);
    }

    render() {
        let buttons = this.props.question.answers.map((question)=> {
            if(question.isCorrect){
                return <button key={question.isCorrect} onClick={() => this.handleRightClick() }> {question.value} </button>
            } else {
                return <button key={question.isCorrect} onClick={() => this.handleWrongClick() }> {question.value} </button>
            }
            
        })
        // let message;
        let newButton;
        if(this.state.hasClicked){
            buttons = null;
            newButton = <button>Next Question</button>
        }

        let card = this.props.question;

        return (
            <div className="container">
            <h1>{this.state.count}</h1>
            <div className="text-center"> 
                <h1>Score: {this.state.score}</h1>
                <TriviaCard info={card}/>
                <h2>{this.state.message}</h2>
                {buttons}
                {newButton}
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
