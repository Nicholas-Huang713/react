const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
// const verifyToken = require('./verifyToken');

//GET ALL USERS
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

//GET A USER
router.get('/getuser', verifyToken, (req, res) => {
    // res.json("Decoded Token: " + req.token);
    jwt.verify(req.token,  process.env.TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.sendStatus(403);
        } else {
            Users.find({_id: decoded})
                .then((data) => {
                    console.log('Data: ' + data);
                    res.json(data);
                })
                .catch((error) => {
                    console.log('Error: ' + error)
            });
        }
    })
   
    // Users.find({email: req.body})
    //     .then((data) => {
    //         console.log('User Data from DB: ' + data);
    //         res.json(data);
    //     })
    //     .catch((error) => {
    //         res.json(error);
    //         console.log('Error: ' + error);
    // });  
        
    
    // Users.findById()
});

//REGISTER
router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    const emailExist = await Users.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email, 
        password: hashedPassword
    });
    try{
        await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } catch(err){
        res.status(400).send(err);
    }   
});

//LOGIN
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')

    // res.json(user);
    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
});

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