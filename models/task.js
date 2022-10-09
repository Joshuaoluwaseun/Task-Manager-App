const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must have a valid name'],
        trim: true,
        maxLength: [20, 'Name cannot be more than 20 words'],
        minLength: [5, 'Name cannot be less than 5 words']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
