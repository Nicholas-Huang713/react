import React from 'react';


class SongDetails extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {song} = this.props;

        return (
            <div className="container text-light text-center bg-dark border border">
                <div className="row">
                    <div className="col">
                        <br/>
                        <h2>{song.album.title}</h2>
                        <img src={song.album.cover_medium} alt="album cover"/>
                        <br/>
                        <br/>
                    </div>
                    <div className="col">
                        <br/>
                        <h2>{song.title_short} </h2> 
                        <p> <img src={song.artist.picture_small} alt="artist" /> {song.artist.name}</p>
                        <audio src={song.preview} controls autoPlay></audio>                       
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SongDetails;