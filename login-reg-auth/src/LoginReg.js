import React from 'react';
import axios from 'axios';
const jwt = require('jsonwebtoken');

class LoginReg extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logName: "",
            logPassword: "",
            regName: "",
            regPassword: "",
            logError: "",
            regError: "",
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
    handleLogin = (event) => {
        const {logName, logPassword} = this.state;
        if(!this.userCanBeMatched()) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const currentUser = {
            name: logName,
            password: logPassword
        }
        jwt.sign({currentUser}, 'secretkey', (err, token) => {
            localStorage.setItem('token', token);
            
        });
        this.props.insertToken();
        this.props.history.push('/protected');
    }

    userCanBeMatched(){
        const{userList, logName, logPassword} = this.state;
        if(logName === "") {
            this.setState({
                logError: "Name field required"
            })
        }
        if(logPassword=== "") {
            this.setState({
                logError: "Password field required"
            })
        }
        if(logName==="" && logPassword==="") {
            this.setState({
                logError: "All fields required"
            })
        }
        let userCanBeMatched = false;
        for(var i = 0; i < userList.length; i++){
            if(userList[i].name===logName && userList[i].password=== logPassword){
                userCanBeMatched = true;
                }
            }
        if(!userCanBeMatched){
            this.setState({
                logError: "Name or password incorrect"
            })
        }
        return userCanBeMatched && logName !== "" && logPassword !== ""
    }

    handleRegister = (event) => {
        if(!this.regCanBeSubmitted()){
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const newUser = {
            name: this.state.regName,
            password: this.state.regPassword
        }
        jwt.sign({newUser}, 'secretkey', (err, token) => {
            localStorage.setItem('token', token);
            
        });
        this.props.insertToken();
        this.props.history.push('/protected');
        
        axios({
            url: '/api/register',
            method: 'POST',
            data: newUser        
        })
        .then(() => {
            console.log('New user registered', newUser);
        })
        .catch(() => {
            console.log('Internal server error');
        });
        
    }

    regCanBeSubmitted() {
        const {regName, regPassword, userList} = this.state;
        if(regName.length < 4) {
            this.setState({
                regError: "Name must be longer than 4 characters"
            })
        }
        if(regName === "") {
            this.setState({
                regError: "Name field required"
            })
        }
        if(regPassword === "") {
            this.setState({
                regError: "Password field required"
            })
        }
        if(regName === "" && regPassword === ""){
            this.setState({
                regError: "All fields required"
            })
        }
        const dataContainer =[];
        for(var i = 0; i < userList.length; i++){
            if(userList[i].name===regName){
                dataContainer.push(userList[i]);
            }
        }
        if(dataContainer.length > 0){
            this.setState({
                regError: "User with same name already created"
            })
        }
        return regName.length > 4 && regName !== "" && regPassword !== ""  && dataContainer.length === 0
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

    render(){
        const {logError, regError} = this.state;

        return (
            <div className="LoginReg">
            <h2>Login</h2>
                {logError}
                <form onSubmit={this.handleLogin}>
                    <p>Name
                        <input type="text" 
                                name="logName"                            
                                value={this.state.logName}
                                onChange={this.handleChange}                            
                        />
                    </p>
                    <p>Password
                        <input type="text" 
                                name="logPassword"
                                value={this.state.logPassword}                                
                                onChange={this.handleChange}                               
                        />
                    </p>
                    <button>Login</button>
                </form>
            <h2>Register</h2>
            {regError}
            <form onSubmit={this.handleRegister}>
                    <p>Name
                        <input type="text" 
                                name="regName"                            
                                value={this.state.regName}
                                onChange={this.handleChange}                            
                        />
                    </p>
                    <p>Password
                        <input type="text" 
                                name="regPassword"
                                value={this.state.regPassword}                                
                                onChange={this.handleChange}                               
                        />
                    </p>
                    <button>Register</button>
                </form>
            </div>
        );
            }

}

export default LoginReg;