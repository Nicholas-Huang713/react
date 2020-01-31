import React from 'react';
import {withRouter} from 'react-router-dom';

class NavBar extends React.Component { 
    constructor(props) {
        super(props);
        this.state={
            loginPage: null
        }
    }

    signOut = () =>{
        localStorage.removeItem('token');
        this.props.removeToken();
        this.setState({
            loginPage: true
        })
        this.props.history.push('/login');
    }

    handleLoginClick = () => {
        this.setState({
            loginPage: true
        })
        this.props.history.push('/login')
    }

    handleHomeClick = () => {
        this.setState({
            loginPage: false
        })
        this.props.history.push('/');
    }

    render() {
        const {token} = this.props;
        const {loginPage} = this.state;
        return (
            <nav>
                {
                    token && 
                    <button onClick={this.signOut}>Sign Out</button>
                }
                {
                    (!token && loginPage) ? 
                    <button onClick={this.handleHomeClick}>Home</button> :
                    <button onClick={this.handleLoginClick}>Login and Registration</button> 
                }
            </nav>
        );
    }  
}

export default withRouter(NavBar);
