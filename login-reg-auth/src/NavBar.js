import React from 'react';
import {Link, withRouter} from 'react-router-dom';
// import auth0Client from './Auth';

class NavBar extends React.Component { 
    constructor(props) {
        super(props);
        this.state={
        }
    }

    signOut =() =>{
        localStorage.removeItem('token');
        this.props.removeToken();
        this.props.history.push('/');
    }

    render() {
        // let currentButton;
        // const token = localStorage.getItem('token');
        // if(!token) {
        //     currentButton = <Link to="/login"> Login and Registration </Link>
        // } else {
        //     currentButton = <button onClick={this.signOut}>Sign Out</button>
        // }
        const {token} = this.props;
        return (
            <nav>
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                {
                    token &&
                    <button onClick={this.signOut}>Sign Out</button>
                }
                {
                    !token &&
                    <button onClick={this.handleLoginClick}> <Link to="/login"> Login and Registration </Link></button>
                }
            </nav>
        );
    }

  
}

export default withRouter(NavBar);
