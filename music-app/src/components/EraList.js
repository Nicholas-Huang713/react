import React from 'react';

class EraList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        
    }

    render() {
        const {name, songList, chooseSong} = this.props;
        
        return(
            <div className="container text-left">
                <div className="mx-auto list-group">
                    {songList.map((value, index) => {
                        return <button key={index} className="btn btn-transparent" onClick={() => chooseSong(value.id)}> <img src={value.album.cover_small} alt="artist" /> <b>{value.artist.name}</b> - {value.title} </button>            
                        })
                    }
                </div>
            </div>
                              
            
        )
    }
}

export default EraList;