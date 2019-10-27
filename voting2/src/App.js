import React from 'react';
import logo from './logo.svg';
import './App.css';

import Language from './Language';

const App = (props) => {
  return (
    <div className="container text-center">
     <div>
       <Language name="React" />
       <Language name="Vue" />
       <Language name="Angular" />
       <Language name="Ember" />
     </div>
    </div>
  );
}

export default App;
