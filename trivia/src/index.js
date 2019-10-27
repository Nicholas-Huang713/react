import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import TriviaCard from './TriviaCard';

const App = (props) => {
    return (
        <div className="App">
            <TriviaCard 
                imgPath="https://media.newyorker.com/photos/59097511019dfc3494ea2a0f/master/w_727,c_limit/Phillips-AnAwkwardFarewelltoKobeBryant.jpg"
                title = "Basketball"
                question = "Who is the best basketball player ever?"
                hint = "He is a Laker" />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

