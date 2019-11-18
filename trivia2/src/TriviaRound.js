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
            hasFlipped: false
        }
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleFlip = this.handleFlip.bind(this);
    }

    handleRightClick() {
        clearInterval(this.myInterval);
        if(this.state.count <= 10){
            const newMessage = `Correct! Score +${this.state.score}`;
            this.setState({
                message: newMessage,
                hasClicked: true
            });
            this.setState(prevState => ({
                score: prevState.score + 5
            }));
        } else if(this.state.count <= 20) {
            const newMessage = `Correct! Score +${this.state.score}`;
            this.setState({
                message: newMessage,
                hasClicked: true
            });
            this.setState(prevState => ({
                score: prevState.score + 3
            }));
        } else {
            const newMessage = `Correct! Score +${this.state.score}`;
            this.setState({
                message: newMessage, 
                hasClicked: true
            });
            this.setState(prevState => ({
                score: prevState.score + 1
            }));
        }  
        if(this.state.hasFlipped){
            this.setState(prevState => ({
                score: prevState.score - 1
            }));
        }   
        
    }

    handleWrongClick() {
        this.setState({
            message: "Wrong"
        });
        // clearInterval(this.myInterval);
    }

    handleFlip() {
        console.log("Flipped!");
        this.setState({
            hasFlipped: true
        });
        
    }

    render() {
        let buttons = this.props.question.answers.map((question)=> {
            if(question.isCorrect){
                return <button key={question.answerId} onClick={() => this.handleRightClick() }> {question.value} </button>
            } else {
                return <button key={question.answerId} onClick={() => this.handleWrongClick() }> {question.value} </button>
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
            <div className="jumbotron">
            <h2>Time: {this.state.count}</h2>
            <div className="text-center"> 
                <h1>Score: {this.state.score}</h1>
                <TriviaCard info={card} handleFlip= {this.handleFlip} />
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
