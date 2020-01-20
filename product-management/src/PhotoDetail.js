import React from 'react';
import axios from 'axios';

class PhotoDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            imgUrl: "",
            errorMessage: ""
            // photoList: []
        }
        // this.input = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ 
            [name] : value
        })
    }
    handleSubmit = (event) => {
        if(!this.canBeSubmitted()){
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const updatedPost = {
            title: this.state.title,
            imgUrl: this.state.imgUrl
        }
        axios({
            url: `/api/edit/${this.props.match.params.id}`,
            method: 'POST',
            data: updatedPost        
        })
        .then(() => {
            console.log('Data has been updated', updatedPost);
            this.props.history.push('/photolist');
            // this.resetUserInputs();
        })
        .catch(() => {
            console.log('Internal server error');
        });
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

    componentDidMount = () => {
        this.getPhotoPosts();
      }
    
    getPhotoPosts = () => {
        axios.get(`/api/${this.props.match.params.id}`)
        .then((response) => {
            const data = response.data;
            this.setState({title: data[0].title, imgUrl: data[0].imgUrl});
            console.log('Data has been received', data);
        })
        .catch(() => {
            alert('Error retreiving data');
        });
    }
    // componentWillUnmount() {
    //     this.setState({
    //         title: "",
    //         imgUrl: "",
    //         errorMessage: ""
    //     })
    // }
    render() {
        const {title, imgUrl} = this.state;
        // const item = this.props.photoList[this.props.match.params.index];

        return (
            <div>
                <h3>Edit this Post</h3>
                 <form onSubmit={this.handleSubmit}>
                    <p>Title
                        <input type="text" 
                                name="title"
                                // ref={this.input}
                                value={title}
                                onChange={this.handleChange}
                                // placeholder={item.title}
                                // defaultValue={item.title}
                        />
                    </p>
                    <p>Image Url
                        <input type="text" 
                                name="imgUrl"
                                value={imgUrl}
                                // ref={this.input}
                                onChange={this.handleChange}
                                // defaultValue={item.imgUrl}
                                // placeholder={item.imgUrl}
                        />
                    </p>
                    <button>Edit</button>
                </form>
            </div>
          );
    }
  
}

export default PhotoDetail;