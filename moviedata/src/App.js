import React from 'react';
import './App.css';
import Form from './Form';
import axios from 'axios';

// const axios = require('axios');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movieData : {}
    }
  }
  
  getMovie = (e) => {
    e.preventDefault();
    const movie = e.target.elements.movieName.value;
    console.log(movie);
    axios.get(`http://www.omdbapi.com/?apikey=cece43df&t=${movie}`)
    .then(res => {
      this.setState({
        movieData: res.data
      });
      console.log(this.state.movieData);
    })
    
  }

  render(){
    // const {Year, Director, Plot} = this.state;
    return (
      <div className="container">
        <header className="text-center">
          <h1>Movie Data</h1>
        </header>
        <Form getMovie={this.getMovie}/>
        <div className="container text-center">
          <img src={this.state.movieData.Poster} />
          <h3>Year: {this.state.movieData.Year}</h3>
          <h3>Director: {this.state.movieData.Director}</h3>
          <p>Plot: {this.state.movieData.Plot} </p>
        </div>
      </div>
    );
  }
  
}

export default App;
