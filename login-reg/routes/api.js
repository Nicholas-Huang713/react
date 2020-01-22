const express = require('express');

const router = express.Router();

const Users = require('../models/users');

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

router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newUser = new Users(data);

    newUser.save((error) => {
        if(error) {
            res.status(500).json({msg: 'Internal server error'});
            return;
        } 
        return res.json({
            msg: 'New user has been created'
        });
    });
});


module.exports = router;