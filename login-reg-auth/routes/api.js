const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    Users.find({})
        .then((data) => {
            console.log('Data: ' + data);
            res.json(data);
         })
        .catch((error) => {
            console.log('Error: ' + error)
        });
});

router.get('/:name', (req,res)=> {
    Users.find({name: req.params.name})
    .then((data)=> {
        console.log(data);
        res.json(data);
    })    
    .catch((error)=>{
        console.log("Error: " + error);
    })
})

router.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    })
    
});

router.post('/register', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newUser = new Users(data);
    
    newUser.save((error) => {
        if(error) {
            res.status(500).json({msg: 'Internal server error'});
            return;
        } 
        else {
            res.json({
                msg: 'New user has been created'
            });
            
        }
    });
    
});

//Verify Token
function verifyToken(req, res, next){
    //get auth header value 
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set token
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
}
module.exports = router;