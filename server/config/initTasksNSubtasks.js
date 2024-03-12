// const { v4: uuid } = require('uuid')
const { makeConnection, closeConnection } = require('./mongodb')
const Task = require('../models/task')
const Subtask = require('../models/subtask')
const { Types: { ObjectId } } = require('mongoose')

const subtasksToCreate = [{
    _id: new ObjectId(),
    title: 'Finish Project Proposal',
    due_date: '2024-03-15',
    status: 'in progress',
    priority: 'low'
},
{
    _id: new ObjectId(),
    title: 'Prepare Presentation',
    priority: 'medium',
    status: 'todo',
    due_date: '2024-03-20'
}, {
    _id: new ObjectId(),
    title: 'Another name for School Project 1',
    due_date: '2024-03-25',
    status: 'in progress',
    priority: 'high'
},
{
    _id: new ObjectId(),
    title: 'School Project 2',
    priority: 'medium',
    status: 'todo',
    due_date: '2024-03-20'
}]

const tasksToCreate =
[
    {
        title: 'Work Tasks',
        subtasks: [
            subtasksToCreate[0]._id,
            subtasksToCreate[1]._id
        ]
    },
    {
        title: 'School Tasks',
        subtasks: [
            subtasksToCreate[2]._id,
            subtasksToCreate[3]._id
        ]
    }
]

/**
 * make connection and add values internally, then close
 */
makeConnection()
    .then(() => {
        Subtask.insertMany(subtasksToCreate).then(() => {
            console.log('Subtasks created successfully!')
            Task.insertMany(tasksToCreate).then(() => {
                console.log('Tasks created successfully (with references)!')
                closeConnection()
            })
        })
    })
