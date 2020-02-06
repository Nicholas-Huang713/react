import React from 'react';
import '../App.css';
import axios from 'axios';

import {withRouter} from 'react-router-dom';


class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errorMsg: "",
            userList: []
        }
        
    }
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ 
            [name] : value 
        })
    }

    handleRegister = (event) => {
        const {firstName, lastName, email, password} = this.state;
        event.preventDefault();
        const newUser = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }
        
        axios({
            url: '/api/register',
            method: 'POST',
            data: newUser        
        })
        .then((res) => {
            console.log('New user registered', newUser);
            const token = res.data;
            localStorage.setItem('token', token);
            this.props.history.push('/dashboard');
            this.props.renderPage();  
            
        })
        .catch((err) => {
            this.setState({
                errorMsg: err.response.data
            })
            console.log('Error:' + err.response.data);
        });
        
        
    }

    componentWillUnmount() {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errorMsg: "",
        })
    }


    render() {
        const {errorMsg} = this.state;
        return (
            <div className="container mt-5">
                <h3 className="text-center">Create your Account</h3>
                <p className="text-danger text-center text-uppercase font-italic">{errorMsg}</p>
                <form className="regform-style" onSubmit={this.handleRegister}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" 
                                className="form-control"
                                name="firstName"                            
                                value={this.state.firstName}
                                onChange={this.handleChange}                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" 
                                className="form-control"
                                name="lastName"                            
                                value={this.state.lastName}
                                onChange={this.handleChange}                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text" 
                                className="form-control"
                                name="email"                            
                                value={this.state.email}
                                onChange={this.handleChange}                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                                className="form-control"
                                name="password"                            
                                value={this.state.password}
                                onChange={this.handleChange}                            
                        />
                    </div>
                    <button>Create Account</button>
                </form>
            </div> 
        )
    }
}

export default withRouter(Registration);