import React from 'react';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';
import '../App.css';
import {withRouter} from 'react-router-dom';
import FavoriteList from './FavoriteList';

class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentUser: undefined,
            faveList: [],
            allUsers: []
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        axios({
            url: '/api/',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const allUsers = res.data;
            this.setState({
                allUsers
            })
            // this.pushToList(user[0].favelist);
        //    console.log('All Users: ' + JSON.stringify(allUsers));
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
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
                // console.log("Detail List: " + this.state.detailList);
                })
                .catch((error)=>{
                  console.log(error);
            })   
        }
        this.setState({faveList: realList});
    }
    
    unlikeSong = (id) => {
        const jwt = getJwt();
        axios({
            url: '/api/unlike',
            method: 'PUT',
            data: JSON.stringify(id),
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            // this.props.renderPage();
            
            // this.props.history.push('/dashboard');
            this.setState({
                currentUser: res.data
            })
            this.refreshFaveList();
            // this.forceUpdate();
            console.log('User from DB: ' + JSON.stringify(res.data));
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }
    
    choosePlaylist = (id) => {
        this.props.history.push(`/dashboard/${id}`)
    }

    render() {
        const {currentUser, faveList, allUsers} = this.state;
        const {chooseSong} = this.props;
        let firstName;
        if(currentUser === undefined || faveList === undefined){
            firstName = "";
        } else{
            firstName = currentUser[0].firstname;
        }
        
        return(
            <div className="dashboard mt-2">
                <div className="border-dark border-bottom mt-1 ml-3"><h2>Welcome {firstName}</h2></div>
                
               
                <div className="row">
                   
                    <div className="col">
                        <div className="mt-2 ml-4">
                            <h5>My Playlist</h5>
                        </div>
                        <div className="dashboard-list-style">   
                            <FavoriteList id={currentUser} 
                                          chooseSong={chooseSong} 
                                          refresh={this.refreshFaveList}
                                          unlikeSong={this.unlikeSong}
                            />                                                  
                        </div>  
                    </div>
                    <div className="col">
                        <div className="mt-2 ml-4">
                            <h5>Other User's Playlists</h5>
                        </div> 
                        <div className="dashboard-list-style">
                            {
                                allUsers.map((user, index) => {
                                    return (
                                        <div>
                                            <button className="btn dashboard-song-button" onClick={() => this.choosePlaylist(user._id)}> 
                                                {user.firstname}'s Playlist                     
                                            </button>   
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                

            </div>
        )
    }
}

export default withRouter(DashBoard);