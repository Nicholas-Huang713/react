import React from 'react';

class TriviaCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: "Basketball",
            question:  "Who is the best basketball player ever?",
            hint:  "",
            hasClicked: false

        }
    }

    backFlip() {
        this.setState ({
            title : "",
            question: "",
            hint: "He is a Laker",
            hasClicked: true
        });
    }
 
    frontFlip() {
        this.setState({
            title: "Basketball",
            question:  "Who is the best basketball player ever?",
            hint:  "",
            hasClicked: false
        });
    }

    render() {
        const {imgPath, title, question, hint} = this.props;
        let img;
        
        if(this.state.hasClicked) {
            img = <img onClick={() => this.frontFlip() } src="https://media.newyorker.com/photos/59097511019dfc3494ea2a0f/master/w_727,c_limit/Phillips-AnAwkwardFarewelltoKobeBryant.jpg" alt="Kobe Pic" /> ;
            
        }
        else{
            img =  <img onClick={() => this.backFlip() } src="https://media.newyorker.com/photos/59097511019dfc3494ea2a0f/master/w_727,c_limit/Phillips-AnAwkwardFarewelltoKobeBryant.jpg" alt="Kobe Pic" /> ;
            
        }
       
        return (
            <div className="border border-primary"> 
                {img}
                <h4>{this.state.title}</h4>   
                <p>{this.state.question}</p>
                <p>{this.state.hint}</p>
            </div>
        )
    }

}

export default TriviaCard;