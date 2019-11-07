import React from 'react';

class TriviaCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: "Baseball",
            question:  "What player holds the career record for most stolen bases?",
            hint:  "",
            hasClicked: false

        }
    }

    backFlip() {
        this.setState ({
            title : "",
            question: "",
            hint: "This player stole a single season record of 130 bases in 1983 as a member of the Oakland Athetics",
            hasClicked: true
        });
    }

    frontFlip() {
        this.setState({
            title: "Baseball",
            question:  "What player holds the career record for most stolen bases?",
            hint:  "",
            hasClicked: false
        });
    }

    render() {
        const {imgPath, title, question, hint} = this.props;
        let img;
        
        if(this.state.hasClicked) {
            img = <img onClick={() => this.frontFlip() } src={this.props.info.topic.imageUrl} alt="Kobe Pic" /> ;
            
        }
        else{
            img =  <img onClick={() => this.backFlip() } src={this.props.info.topic.imageUrl} alt="Kobe Pic" /> ;
            
        }
       
        return (
            <div className="border border-primary container text-center"> 
                {img}
                <h4>{this.state.title}</h4>   
                <p>{this.state.question}</p>
                <p>{this.state.hint}</p>
            </div>
        )
    }
}

export default TriviaCard;