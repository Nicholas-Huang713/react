const express = require('express');

const router = express.Router();

const PhotoPost = require('../models/photoPost');

//Routes
router.get('/', (req, res) => {
    PhotoPost.find({})
        .then((data) => {
            console.log('Data: ' + data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ' + error)
        });
    
});

router.get('/:id', (req, res)=> {
    PhotoPost.find({_id: req.params.id})
    .then((data) => {
        console.log('Data: ' + data);
        res.json(data);
    })
    .catch((error) => {
        console.log('Error '+ error);
    })
})

router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newPhotoPost = new PhotoPost(data);

    newPhotoPost.save((error) => {
        if(error) {
            res.status(500).json({msg: 'Internal server error'});
            return;
        } 
        return res.json({
            msg: 'Data has been saved'
        });
    });
});

router.post('/edit/:id', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    PhotoPost.findOneAndUpdate({_id: req.params.id}, {$set: {title: data.title, imgUrl: data.imgUrl}}, (err,result) => {
        if(err){
            res.status(500).json({msg: 'Internal server error'});
            return;
        }
        result.save((error) => { 
            return res.json({
                msg: "Data has been updated"
            })
        })
    });
});

router.delete('/:id', (req, res) => {
    PhotoPost.findOneAndRemove({_id: req.params.id}, (err,result) => {
        if(err){
            res.status(500).json({msg: 'Internal server error'});
            return;
        }
        result.save((error) => { 
            return res.json({
                msg: "Data has been deleted"
            })
        })
    });
});



module.exports = router;