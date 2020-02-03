const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express(); 
const PORT = process.env.PORT || 8003;

const routes = require('./routes/api')

mongoose.connect('mongodb://localhost/music_app', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

//Check for database connection
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!")
})

//Make data available to req.body 
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Http request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));