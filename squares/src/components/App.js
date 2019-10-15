import React from 'react';

import Title from './Title';
import './App.css';
const App = (props) => {
    return (
        <div class="jumbotron">
            <div class="row">
                <div class="col bg-primary">
                    <Title text="White on blue" color="white" isImportant={true} />
                </div>
                <div class="col bg-danger">
                    <Title text="blue on red" color="blue" isImportant={false} />
                </div>
                <div class="col bg-info">
                    <Title text="green on pink" color="green" isImportant={false} />
                </div>
            </div>
        </div>
    );
};
export default App;