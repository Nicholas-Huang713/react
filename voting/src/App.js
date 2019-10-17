import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReactButton from './ReactButton';
import VueButton from './VueButton';
import AngularButton from './AngularButton';
import EmberButton from './EmberButton';

function App() {
  return (
    <div className="App">
      <h2>Vote Your Favorite JS Library</h2> 
      <table className="table">
        <tr>
          <td>React</td>
          <td>
            <ReactButton />
          </td>
        </tr>
        <tr>
          <td>Vue</td>
          <td>
            <VueButton />
          </td>
        </tr>
        <tr>
          <td>Angular</td>
          <td>
            <AngularButton />
          </td>
        </tr>
        <tr>
          <td>Ember</td>
          <td>
            <EmberButton />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
