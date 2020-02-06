import React from 'react';
import EraList from './EraList';
import SongDetails from './SongDetails';
import axios from 'axios';


class AllMusic extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            randomList: [],
            seventyList: [],
            eightyList: [],
            ninetyList: [],
            currentEra: "",
            currentSong: {},
            hasClicked: false
        };
        this.chooseSong = this.chooseSong.bind(this);
    }

  
    componentDidMount() {
        const seventyIds = [3824597, 3824607, 131224316, 458844802];
        const eightyIds = [3200551, 116945540, 112658750, 409962042];
        const ninetyIds = [627421302, 70816229, 3616616, 66027422];
        const seventyList = [];
        const eightyList = [];
        const ninetyList = [];
        const randomList = [];

        for(const [index, value] of seventyIds.entries()) {
            axios({
                "method":"GET",
                "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${value}`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
                }
                })
                .then((response)=>{
                  seventyList.push(response.data);
                  randomList.push(response.data);
                //   console.log(seventyList)
                })
                .catch((error)=>{
                //   console.log(error)
            })   
            
        }
        for(const [index, value] of eightyIds.entries()) {
            axios({
                "method":"GET",
                "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${value}`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
                }
                })
                .then((response)=>{
                  eightyList.push(response.data);
                  randomList.push(response.data);
                //   console.log(eightyList)
                })
                .catch((error)=>{
                //   console.log(error)
            })   
            
        }
        for(const [index, value] of ninetyIds.entries()) {
            axios({
                "method":"GET",
                "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${value}`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
                }
                })
                .then((response)=>{
                  ninetyList.push(response.data);
                  randomList.push(response.data);
                })
                .catch((error)=>{
                //   console.log(error)
            })   
            
        }
        this.setState({
            seventyList,
            eightyList,
            ninetyList,
            randomList
        })
    }

    handleSeventies = () => {
        this.setState({
            currentEra: "70s"
        })
    }
    handleEighties = () => {
        this.setState({
            currentEra: "80s"
        })
    }
    handleNineties = () => {
        this.setState({
            currentEra: "90s"
        })
    }
    handleDiscover = () => {
        const {randomList} = this.state;
        const total = randomList.length;
        const randNum = Math.floor(Math.random() * total);
        const randSong = randomList[randNum];
        this.setState({
            hasClicked: true,
            currentSong: randSong
        })
    }

    chooseSong(id){
        axios({
            "method":"GET",
            "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
            }
            })
            .then((response) =>{
              this.setState({
                  currentSong : response.data,
                  hasClicked: true
              })
            //   console.log(this.state.currentSong)
            })
            .catch((error)=>{
              console.log(error)
        })    
    }
    

    render() {
        const {currentEra, seventyList, eightyList, ninetyList, currentSong} = this.state;
        let era;
        let details;
        if (currentEra === "70s"){
            era = <EraList name="70" songList={seventyList} chooseSong={this.chooseSong} />
        } 
        else if(currentEra ==="80s") {
            era = <EraList name="80" songList={eightyList} chooseSong={this.chooseSong} />
        }
        else if(currentEra ==="90s") {
            era = <EraList name="90" songList={ninetyList} chooseSong={this.chooseSong} />
        } else {
            era = <div style={{height: '300px'}}></div>
        }

        if(this.state.hasClicked) {
            details = <SongDetails song={currentSong} />
        } 
        else{
            details = <div className="jumbotron text-center bg-dark">
                        <h1>Play a Song</h1>
                    </div>
        }

        return(
            <div className="container">
                <div className="text-center">
                    <br />
                    <div className="btn-group btn-group-lg" role="group" aria-label="Button Navigation">
                        <button type="button" className="btn btn-success" onClick={this.handleDiscover}>Discover</button>
                        <button type="button" className="btn btn-outline-dark" onClick={this.handleSeventies}>70's</button>
                        <button type="button" className="btn btn-outline-dark" onClick={this.handleEighties}>80's</button>
                        <button type="button" className="btn btn-outline-dark" onClick={this.handleNineties}>90's</button>
                    </div>
                </div>
                <br />
                {era}
                {details}
            </div>
        )
    }
}
export default AllMusic; 