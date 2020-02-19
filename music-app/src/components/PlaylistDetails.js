import React from 'react';
import '../App.css';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';

class PlaylistDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            faveList: []
        }
        
    }
    componentDidMount() {
        const jwt = getJwt();
        const id = this.props.match.params.id;
        axios({
            url: `/api/playlist/${id}`,
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const user = res.data;  
            this.setState({currentUser: JSON.stringify(user)});
            this.pushToList(user[0].favelist); 
            console.log("State User: " + this.state.currentUser);
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }
   
    pushToList(list){
        let updatedList = [];
        let realList = [];
        for(let i = 0; i < list.length; i++){
            updatedList.push(Object.keys(list[i]));
        }
        for(let i = 0; i < updatedList.length; i++){
            axios({
                "method":"GET",
                "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${updatedList[i]}`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
                }
                })
                .then((response)=>{
                    realList.push(response.data);
                    this.setState({faveList: realList});
                // console.log("Detail List: " + this.state.detailList);
                })
                .catch((error)=>{
                  console.log(error);
            })   
        }
        
    }
    render() {
        const {currentUser, faveList} = this.state;
        let name;
        if(currentUser === undefined){
            name = "";
        }
        else{
            name = currentUser[0].firstname;
        }
        return (
            <div>
                <h3>{name}'s Playlist</h3> 
                <ul>
                    {
                        faveList.map((song) => {
                            return <li>{song.artist.name}</li>
                        })
                    }
                </ul>
                
                
            </div>
        );
    }
}    

export default PlaylistDetails;