const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-q2gz4gol.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: '4hPKlHP1GRP2a4a7HtjZJbLO45QT8rJk',
    issuer: `https://dev-q2gz4gol.auth0.com/`,
    algorithms: ['RS256']
  });

router.post('/register', checkJwt, (req, res) => {
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