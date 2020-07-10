const express = require('express');
const router = express.Router();

const { Task } = require('../db');

router.get('/', (req, res) => {
    Task.find((err, task) => {
        if(!err){ res.send(task); }
        else{ console.log(JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = { router };