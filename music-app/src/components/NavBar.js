import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            browsePage: false
        }
    }
    removeToken = () => {
        localStorage.removeItem("token");
        this.props.history.push('/');
    };

    handleBrowseClick = () => {
        this.setState({
            browsePage: true
        });
        this.props.history.push('/browse');
    };

    handleDashboardClick = () => {
        this.setState({
            browsePage: false
        });
        this.props.history.push('/dashboard');
    };

    render() {
        const {browsePage} = this.state;
        return (
            <div>
                {
                    localStorage.getItem("token") ? 
                    <div className="container  mt-3">
                        <div className="row">
                            <div className="col text-left">
                                {
                                    browsePage ? 
                                    <button className="btn btn-outline-dark" onClick={this.handleDashboardClick}>Dashboard</button>
                                    :
                                    <button className="btn btn-outline-dark" onClick={this.handleBrowseClick}>Browse Music</button>
                                }
                                
                            </div>
                            <div className="col text-right">
                                <button className="btn btn-outline-dark" onClick={this.removeToken}>Logout</button>
                            </div>
                        </div>
                        
                        
                        
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