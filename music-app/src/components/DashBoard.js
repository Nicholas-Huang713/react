import React from 'react';
import axios from 'axios';
import {getJwt, getStorageEmail} from '../helpers/jwt';


class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentUser: []
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        // const email = getStorageEmail();
        axios({
            url: '/api/getuser',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        // axios.get('/api/getuser', {})
        .then((res) => {
           this.setState({
               currentUser: res.data
           })
           console.log('User: ' + res.data);
        })
        .catch((err) => {
            console.log('Error:' + err.response.data);
        });
        
    }
    render() {
        return(
            <div>
                <h3>Welcome Nick</h3>
            </div>
        )
    }
}

export default DashBoard;