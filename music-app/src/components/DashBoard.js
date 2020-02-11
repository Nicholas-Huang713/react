import React from 'react';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';
import '../App.css';

class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentUser: undefined,
            detailList: [],
        }
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
            this.setState({
                currentUser: user
            })
            this.pushToList(user[0].favelist);
        //    console.log('Dashboard State User: ' + this.state.currentUser[0].favelist);
           console.log('User: ' + JSON.stringify(user));
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
        for(let i=0;i<updatedList.length;i++){
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
                   this.setState({
                    detailList: realList,
                })
                // console.log("Detail List: " + this.state.detailList);
                })
                .catch((error)=>{
                  console.log(error)
            })   
        }
        
    }
    render() {
        const {currentUser, detailList} = this.state;
        let firstName;
        // let list = [];
        if(currentUser === undefined){
            firstName = "";
        } else{
            // list = detailList
            firstName = currentUser[0].firstname;
        }
        
        return(
            <div className="dashboard mt-4">
                <h2>Welcome {firstName} </h2>
                <div className="row">
                   
                
                    <div className="col border border-dark"> 
                        <div className="h-25" >
                            <div className="border-dark border-bottom">
                                <h3>My Playlist</h3>
                            </div>
                            {
                                    detailList.map((song, index) => {
                                        return (
                                            <div key={song.id}>
                                                <button className="btn btn-transparent"> <img src={song.album.cover_small} alt="artist" /> 
                                                    <b>{song.artist.name}</b> - {song.title} 
                                                </button>   
                                            </div>  
                                            )       
                                    })
                                }
                                
                                
                                
                                {/* {
                                    detailList.map((song) =>{
                                        return <p>{song.title}</p>
                                    })
                                } */}
                        </div>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
                

            </div>
        )
    }
}

export default DashBoard;