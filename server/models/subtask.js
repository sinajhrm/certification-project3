// I have used orchard's project from module 8 to write this file

const mongoose = require('mongoose')

const subtaskSchema = new mongoose.Schema({
    title: String,
    due_date: String,
    status: String,
    priority: String
})

subtaskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Subtask = mongoose.model('Subtask', subtaskSchema)

module.exports = Subtask
