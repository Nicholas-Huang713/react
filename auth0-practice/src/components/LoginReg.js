import React from 'react';
import axios from 'axios';
// import auth0Client from '../Auth';

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
        if(!this.userCanBeMatched()) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        this.props.history.push('/dashboard');
    }
    userCanBeMatched() {
        
    }

    handleRegister = (event) => {
        if(!this.canBeSubmitted()){
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const newUser = {
            name: this.state.regName,
            password: this.state.regPassword
        }
        axios({
            url: '/api/register',
            method: 'POST',
            data: newUser        
        })
        .then(() => {
            console.log('New user created', newUser);
            // this.props.history.push('/dashboard');
            // this.resetUserInputs();
        })
        .catch(() => {
            console.log('Internal server error');
        });
    }

    canBeSubmitted() {
        const {regName, regPassword} = this.state;
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
        return regName.length > 4 && regName !== "" && regPassword !== "" 
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
