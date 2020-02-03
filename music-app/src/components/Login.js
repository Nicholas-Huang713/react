import React from 'react';
import '../App.css';
import axios from 'axios';
const jwt = require('jsonwebtoken');

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            email: "",
            password: "",
            userList: [],
            logError: ""
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
        const {email, password} = this.state;
        if(!this.userCanBeMatched()) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const currentUser = {
            email,
            password
        }
        jwt.sign({currentUser}, 'secretkey', (err, token) => {
            localStorage.setItem('token', token);
        });
        // this.props.insertToken();
            this.props.history.push('/protected');
        
    }
    userCanBeMatched(){
        const{userList, email, password} = this.state;
        if(email === "") {
            this.setState({
                logError: "Name field required"
            })
        }
        if(password=== "") {
            this.setState({
                logError: "Password field required"
            })
        }
        if(email==="" && password==="") {
            this.setState({
                logError: "All fields required"
            })
        }
        let userCanBeMatched = false;
        for(var i = 0; i < userList.length; i++){
            if(userList[i].email===email && userList[i].password=== password){
                userCanBeMatched = true;
                }
            }
        if(!userCanBeMatched){
            this.setState({
                logError: "Name or password incorrect"
            })
        }
        return userCanBeMatched && email !== "" && password !== ""
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
        const {logError} = this.state;
        return (

          <div className="container mt-5">
            <h3 className="text-center">Login Here</h3>
            <p className="text-danger">{logError}</p>
            <form className="logform-style" onSubmit={this.handleLogin}>
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
                <button>Login</button>
            </form>
          </div>  
        )
    }
}

export default Login; 
