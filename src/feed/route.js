'use strict';

var express = require('express');
var router = express.Router();

const Controller = require('./controller');
const validatorClass = require('./validator');
const validator = new validatorClass(); 

/* GET home page. */
router.get('/feed', validator.getFeed, validator.validateHandler, async(req, res, next) => {
    try {
        let response = await Controller.getFeed(req.query);
        res.status(response.status).send({ status: response.status, feeds: response.data });
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message});
    }
});

module.exports = router;