import React from 'react';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';
import '../App.css';

class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentUser: undefined
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
           this.setState({
               currentUser: res.data
           })
        //    console.log('State User: ' + this.state.currentUser[0].firstname);
        //    console.log('User: ' + JSON.stringify(res.data));
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
        
    }
    render() {
        const {currentUser} = this.state;
        let firstName;
        if(currentUser === undefined){
            firstName = ""
        } else{
            firstName = currentUser[0].firstname;
        }
        
        
        return(
            <div className="dashboard mt-4">
                <h3>Welcome {firstName} </h3>
                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-action active">
                        Cras justo odio
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
                    <button type="button" className="list-group-item list-group-item-action">Morbi leo risus</button>
                    <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac</button>
                    <button type="button" className="list-group-item list-group-item-action" disabled>Vestibulum at eros</button>
                </div>

            </div>
        )
    }
}

export default DashBoard;