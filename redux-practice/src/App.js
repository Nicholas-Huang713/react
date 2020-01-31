import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, signin, signout, addname, removename} from './actions';

function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.isLogged);
  const nameList = useSelector(state => state.addName);
  return (
    <div className="App">
      <h1>Counter {counter} </h1>
      <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement(5))}>-</button>
      <h1>Logged In? : {loginState}</h1>
      {
        loginState ? 
        <button onClick={() => dispatch(signout())}>Signout</button> :
        <button onClick={() => dispatch(signin())}>Signin</button>
      }
      <br></br>
      {
        nameList.map((name, index)=>{
          return <ul key={index}>
                    <li>{name}</li>
                </ul>
        })
      }
      <button onClick={() => dispatch(addname())}>Add Name to list</button> |
      <button onClick={() => dispatch(removename())}>Remove Name from list</button>
    </div>
  );
}

export default App;
