const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let ObjectID = require('mongodb').ObjectId;

let userWrapper = (usersCollection) => {

    router.use(bodyParser.urlencoded({
        extended: true
    }));


    /* GET users listing. */
    router.get('/', function(req, res, next) {
        usersCollection.find().toArray()
            .then(results => {
                res.send(results);
            })
            .catch(error => res.send(error))
    });


    /* CREATE a user. */
    router.post('/', function(req, res, next) {

        let data = {
            'name' : req.body.name,
            'gender' : req.body.gender,
            'email' : req.body.email,
            'status' : req.body.status
        };

        usersCollection.insertOne(req.body)
            .then(result => {
                res.send(result);
            })
            .catch(error => res.send(error))
    });


    /* READ a user data. */
    router.get('/:id', function(req, res, next) {
        usersCollection.findOne(ObjectID(req.params.id))
            .then(results => {
                res.send(results);
            })
            .catch(error => res.send(error))
    });



    /* UPDATE a user. */
    router.patch('/:id', function(req, res, next) {

        let data = {
            'name' : req.body.name,
            'gender' : req.body.gender,
            'email' : req.body.email,
            'status' : req.body.status
        };

        usersCollection.updateOne({_id: ObjectID(req.params.id)}, { $set: data })
            .then(results => {
                res.send(results);
            })
            .catch(error => res.send(error))
    });



    /* DELETE a user. */
    router.delete('/:id', function(req, res, next) {
        usersCollection.deleteOne({_id: ObjectID(req.params.id)})
            .then(results => {
                res.send(results);
            })
            .catch(error => res.send(error))
    });

    return router;
}


module.exports = userWrapper;