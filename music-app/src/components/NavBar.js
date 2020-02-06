import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    removeToken = () => {
        localStorage.removeItem("token");
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                {
                    localStorage.getItem("token") ? 
                    <div className="container text-right mt-3">
                        <button className="btn btn-outline-dark" onClick={this.removeToken}>Logout</button>
                    </div>
                    :
                    <div className="container text-center mt-3">
                    <div className="btn-group btn-group-lg" role="group" aria-label="Button Navigation">
                        <Link to="/login"><button type="button" className="btn btn-outline-dark">Login</button></Link>
                        <Link to="/register"><button type="button" className="btn btn-outline-dark">Register</button></Link>
                    </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(NavBar);