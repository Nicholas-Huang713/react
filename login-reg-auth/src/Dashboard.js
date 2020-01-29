import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userList: []
    }
  }
  componentDidMount(){
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
    const {userList} = this.state;
    return (
      <div className="Dashboard">
        <h1>UserList</h1>
        <ul>
          {
            userList.map((user)=>{
              return <li key={user._id}>
                        <p>{user.name}</p> 
                    </li>
            })
          }
        </ul>
      </div>
    );
  }
    
}

export default Dashboard;
