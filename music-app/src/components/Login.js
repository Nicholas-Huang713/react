import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state ={

        }
        
    }
    render() {
        return (
          <div>
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" />
                </div>
                <button>Login</button>
            </form>
          </div>  
        )
    }
}

export default Login; 
