import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PhotoList extends React.Component {
  state = {
    photoList: []
  }
  componentDidMount = () => {
    this.getPhotoPosts();
  }
  
  getPhotoPosts = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({photoList: data});
      console.log('Data has been received');
    })
    .catch(() => {
      console.log('Error retrieving data');
    });
  }

  deletePost(id) {
    axios({
      url: `/api/${id}`,
      method: 'DELETE'       
    })
    .then(() => {
      // this.props.history.push('/photolist');
      this.getPhotoPosts();
      console.log('Data has been deleted');
    })
    .catch(() => {
      console.log('Internal server error');
    });
  }

  render() {
    const {photoList} = this.state;

    return (
      <div className="component-page">
        <ul>
        {photoList.map((value, index) => {
          return <div key={value._id} className="postContainer">
                    <p>{value.title}</p>
                    <img className="postImage" src={value.imgUrl} alt="current post"/>
                    <br></br>
                    <Link to={`/photolist/${value._id}`}><button>Edit</button></Link> <button onClick={() => this.deletePost(value._id)}>Delete</button>
                </div>
        })}
        </ul>
      </div>
    );
  }
  
}

export default PhotoList;
