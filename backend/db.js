const mongoose = require('mongoose');

var Task = mongoose.model('Task', {
    idForTodo: {
        type: Number
    },
    taskname: {
        type: String
    },
    description: {
        type: String
    },
    repeattask: {
        type: String
    },
    isCompleted: {
        type: Boolean, 
        default: false
    }
});

module.exports = { Task };