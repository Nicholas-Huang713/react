import React from 'react';
import '../App.css';
import axios from 'axios';
const jwt = require('jsonwebtoken');

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
        if(!this.canBeSubmitted()){
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const newUser = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }
        jwt.sign({newUser}, 'secretkey', (err, token) => {
            localStorage.setItem('token', token);
            
        });
        // this.props.insertToken();
            
        
        
        axios({
            url: '/api/register',
            method: 'POST',
            data: newUser        
        })
        .then(() => {
            console.log('New user registered', newUser);
            this.props.history.push('/protected');
        })
        .catch(() => {
            console.log('Internal server error');
        });
        
        
    }

    canBeSubmitted() {
        const {firstName, lastName, email, password, userList} = this.state;
        if(firstName.length < 4) {
            this.setState({
                errorMsg: "First name must be longer than 4 characters"
            })
        }
        if(firstName === "") {
            this.setState({
                errorMsg: "First name field required"
            })
        }
        if(lastName.length < 4) {
            this.setState({
                errorMsg: "Last name must be longer than 4 characters"
            })
        }
        if(lastName === "") {
            this.setState({
                errorMsg: "Last name field required"
            })
        }
        if(email.length < 4) {
            this.setState({
                errorMsg: "Email must be longer than 4 characters"
            })
        }
        if(email === "") {
            this.setState({
                errorMsg: "Email field required"
            })
        }
        if(password === "") {
            this.setState({
                errorMsg: "Password field required"
            })
        }
        if(firstName === "" && lastName === "" && email=== "" && password=== ""){
            this.setState({
                errorMsg: "All fields required"
            })
        }
        const dataContainer =[];
        for(var i = 0; i < userList.length; i++){
            if(userList[i].name===firstName){
                dataContainer.push(userList[i]);
            }
        }
        if(dataContainer.length > 0){
            this.setState({
                errorMsg: "User with same name already created"
            })
        }
        return firstName.length > 4 && firstName !== "" && 
               lastName.length > 4 && lastName !== "" && 
               email !== "" &&
               password !== "" && password !== "" && dataContainer.length === 0
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        axios.get('/api')
        .then((response) => {
          const data = response.data;
          this.setState({userList: data});
          console.log('User list retrieved');
        })
        .catch(() => {
          console.log('Error retrieving data');
        });
    }

    render() {
        const {errorMsg} = this.state;
        return (
            <div className="container mt-5">
                <h3 className="text-center">Create your Account</h3>
                <p className="text-danger">{errorMsg}</p>
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
                        <input type="text" 
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

export default Registration;