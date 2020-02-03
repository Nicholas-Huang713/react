import React from 'react';
import Login from './Login';
import Registration from './Registration';

class Start extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage : "login",
            // token: false
        };
    }
    // insertToken = () => {
    //     this.setState({
    //         token: true
    //     })
    // }
    handleLogin = () => {
        this.setState({ 
            currentPage : "login"
        })
    }

    handleReg = () => {
        this.setState({
            currentPage : "reg"
        })
    }

    render() {
        const {currentPage} = this.state;
        let page;
        if(currentPage === "login"){
            page = <Login />
        } else {
            page = <Registration />
        }
        return (
            <div className="container text-center mt-3">
                <div className="btn-group btn-group-lg" role="group" aria-label="Button Navigation">
                    <button type="button" className="btn btn-outline-dark" onClick={this.handleLogin}>Login</button>
                    <button type="button" className="btn btn-outline-dark" onClick={this.handleReg}>Register</button>
                </div>
                {page}
            </div>
        )
    }
}


export default Start;    