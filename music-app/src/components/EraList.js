import React from 'react';
import axios from 'axios';
import '../App.css';
import unliked from './images/unliked.png';
import liked from './images/liked.png';
import {getJwt} from '../helpers/jwt';

class EraList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            stringList: [],
            // updatedUser: undefined
        }
        
    }

    likeSong(id){
        const songId = id;
        const jwt = getJwt();
        axios({
            url: '/api/like',
            method: 'PUT',
            data: JSON.stringify(songId),
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
        //    this.setState({
        //         currentUser: res.data
        //    })
           console.log('User from DB: ' + JSON.stringify(res.data));
           this.props.renderPage();
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }

    unlikeSong = () => {
        this.setState({
            likeBtnClick: false
        })
    }
    componentDidMount() {
        const jwt = getJwt();
        axios({
            url: '/api/getuser',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const user = res.data;
            this.pushToList(user[0].favelist);
            this.setState({currentUser: JSON.stringify(user)});
            console.log("State User: " + this.state.currentUser);
        //    console.log('State User: ' + this.state.currentUser[0].firstname);
        //    console.log('User: ' + JSON.stringify(res.data));
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
        
    }
    pushToList(list){
        let updatedList = [];
        
        for(let i = 0; i < list.length; i++){
            updatedList.push(Object.keys(list[i]));
        }
        this.setState({
            stringList: updatedList
        })
        console.log("String List: " + this.state.stringList);
    }

    // componentDidMount() {
        // const {currentUser} = this.props;
        // this.setState({currentUser});
        // console.log("Current User: " + this.props.currentUser);
        // this.pushToList(this.props.currentUser.favelist);
        // const {currentUser, stringList} = this.props;
        // this.setState({
        //     currentUser: this.props.currentUser
        // })
        // const {currentUser} = this.state;
        // const jwt = getJwt();
        // if(!jwt) {
        // this.props.history.push('/login');
        // }
        // axios({
        //     url: '/api/getuser',
        //     method: 'GET',
        //     headers: {'Authorization' : `Bearer ${jwt}`}
        // })
        // .then((res) => {
            
        //     this.setState({
        //         currentUser: res.data,
        //         // stringList: updatedList
        //     })
           
        //    console.log("State User: " + JSON.stringify(this.state.currentUser));
        // })
        // .then((res) => {
        //     // const {currentUser} = this.state;
        //     const faveList = JSON.stringify(res.data); 
        //     let updatedList = [];
            // faveList.map((item, index) => {
            //     for(const key in item){
            //         updatedList.push(key);
            //     }
            // });
            // for(let i = 0; i < faveList.length; i++){
            //     for(let key in faveList[i]){
            //         updatedList.push(key);
            //     }
            //     updatedList.push(Object.keys(faveList[i]));
            // }
        //     this.setState({
        //         stringList: updatedList
        //     })
        //     console.log("Stringlist from State: " + this.state.stringList);
        // })
        // .catch((err) => {
        //     console.log('Error:' + err);
        // });
        // if(currentUser === undefined){
        //     return;
        // }
        // const faveList = currentUser.favelist;
        // this.pushToList(faveList);
        // let updatedList = [];
        // for(let i = 0; i < faveList.length; i++){
        //     for(let key in faveList[i]){
        //         updatedList.push(key);
        //     }
        //     updatedList.push(Object.keys(faveList[i]));
        // }
    // }
    // pushToList(list){
    //     let updatedList = [];
    //     list.map((item, index) => {
    //         for(const key in item){
    //             updatedList.push(key);
    //         }
    //     });
    //     // for(let i = 0; i < list.length; i++){
    //     //     updatedList.push(Object.keys(list[i]));
    //     // }
    //     this.setState({
    //         stringList: updatedList
    //     })
    //     console.log(this.state.stringList);
    // }

    render() {
        const {songList, chooseSong} = this.props;
        const {currentUser, stringList} = this.state;

        if(currentUser === undefined){
            return (
              <div><h1>Loading...</h1></div>
            )
        }
        let renderList=[];
        for(let i=0; i<stringList.length; i++){
            renderList.push(stringList[i]);
        }
        return(
            <div className="container text-left">
                <div className="mx-auto list-group">
                    {
                        songList.map((song, index) => {
                            return (
                                <div className="list-style" key={song.id}>
                                    {
                                        renderList.includes(song.id) ?
                                        <img onClick={() => this.unlikeSong(song.id)} src={liked} className="like-button" alt="like button" />
                                        :
                                        <img onClick={() => this.likeSong(song.id)} src={unliked} className="like-button" alt="unlike button" />
                                    }
                                    <button className="btn btn-transparent" onClick={() => 
                                        chooseSong(song.id)}> <img src={song.album.cover_small} alt="artist" /> 
                                        <b>{song.artist.name}</b> - {song.title} 
                                    </button>   
                                </div>  
                                )       
                        })
                    }
                </div>
            </div>
                              
            
        )
    }
}

export default EraList;