import React from 'react';
import './App.css';
import axios from 'axios';

class PostPhoto extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            imgUrl: "",
            errorMessage: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({ [name] : value});
    }
    handleSubmit = (event) => {
        if(!this.canBeSubmitted()){
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const newPost = {
            title: this.state.title,
            imgUrl: this.state.imgUrl
        }
        axios({
            url: '/api/save',
            method: 'POST',
            data: newPost        
        })
        .then(() => {
            console.log('Data has been sent to server');
            this.props.history.push('/photolist');
        })
        .catch(() => {
            console.log('Internal server error');
        });
    
    }

    resetUserInputs = () => {
        this.setState({
            title: "",
            imgUrl: "",
            errorMessage: ""
        })
    }
    canBeSubmitted() {
        const {title} = this.state;
        if(title.length < 4) {
            this.setState({
                errorMessage: "Title must be longer than 4 characters"
            })
        }
        if(title === ""){
            this.setState({
                errorMessage: "A title is required"
            })
        }
        return title.length > 4 && title !== ""
    }
    // componentDidUpdate(prevProps, prevState) {
        
    // }
    
    // componentWillUnmount() {
    //     this.setState({
    //         title: "",
    //         imgUrl: "",
    //         errorMessage: ""
    //     })
    // }

    render() {
        const {errorMessage} = this.state;
        return (
            <div className="component-page">
                <h2>Create a New Post</h2>
                {errorMessage}
                <form onSubmit={this.handleSubmit}>
                    <p>Title
                        <input type="text" 
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                        />
                    </p>
                    <p>Image Url
                        <input type="text" 
                                name="imgUrl"
                                value={this.state.imgUrl}
                                onChange={this.handleChange}
                        />
                    </p>
                    <button>Create</button>
                </form>
            </div>
        );
    }
    
}

export default PostPhoto;
