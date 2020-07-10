const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { Task } = require('./db');

const app = express();

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://Kirito:Test1234@cluster0.u8tuq.mongodb.net/whDB?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        err => {
    if (!err) {
        console.log('Successfully connected to database');
    } else {
        console.log(JSON.stringify(err, undefined, 2));       
    }
});

app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});

app.get('/', async(req, res) => {
    Task.find((err, task) => {
        if (!err) {
            res.json(task);
            console.log(task);
            
        } else {
            console.log(JSON.stringify(err, undefined, 2));
        }
    });
});

app.post('/', async(req, res) => {
    var task = new Task({
        idForTodo: req.body.idForTodo,
        taskname: req.body.taskname,
        description: req.body.description,
        repeattask: req.body.repeattask,
        isCompleted: req.body.isCompleted
    });
    task.save((err, task) => {
        if (!err) {
            console.log("Task Added Successsfully");
        } else {
            console.log(JSON.stringify(err, undefined, 2));
            
        }
    })
});

app.put('/:id', async(req, res) => {
    var task = req.body;
    var update = {}

    if (task.isCompleted) {
        update.isCompleted = task.isCompleted;
    } else {
        update.isCompleted = task.isCompleted;
    }


    if(!update){
        res.status(400);
        res.json({
            "error":"invalid data"
        })
    }else{
        Task.findByIdAndUpdate({
            _id:req.params.id
        },update,{}, (err,result) => {
            if (!err) {
                res.json(task);
                console.log(task);

            } else {
                console.log(JSON.stringify(err, undefined, 2));
            }
        })
    }
});

app.delete('/:id', async(req, res) => {

    Task.findByIdAndDelete({_id: req.params.id}, (err, del) => {
        if(err){
            res.json(err);
        } else {
            res.json(del);
        }
    })
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});