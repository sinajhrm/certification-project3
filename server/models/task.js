// I have used orchard's project from module 8 to write this file

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    subtasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subtask'
        }
    ]
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
