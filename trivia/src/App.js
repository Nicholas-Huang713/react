import React from 'react';
import './App.css';

import TriviaCard from './TriviaCard';

function App() {
  return (
    
     <TriviaCard 
        imgPath="/images/fish2.jpeg"
        title = "Basketball"
        question = "Who is the best basketball player ever?"
        hint = "He is a Laker" />
  );
}

export default App;
