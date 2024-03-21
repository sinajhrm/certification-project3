// const { v4: uuid } = require('uuid')
const { makeConnection, closeConnection } = require('../config/mongodb')
const Task = require('../models/task')
const Subtask = require('../models/subtask')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const { Types: { ObjectId } } = require('mongoose')

const subtasksToCreate = [{
    id: new ObjectId(),
    title: 'Finish Project Proposal',
    due_date: '2024-03-15',
    status: 'in progress',
    priority: 'low'
},
{
    id: new ObjectId(),
    title: 'Prepare Presentation',
    priority: 'medium',
    status: 'todo',
    due_date: '2024-03-20'
}, {
    id: new ObjectId(),
    title: 'Another name for School Project 1',
    due_date: '2024-03-25',
    status: 'in progress',
    priority: 'high'
},
{
    id: new ObjectId(),
    title: 'School Project 2',
    priority: 'medium',
    status: 'todo',
    due_date: '2024-03-20'
}]

const tasksToCreate =
    [
        {
            id: new ObjectId(),
            title: 'Work Tasks',
            subtasks: [
                subtasksToCreate[0].id,
                subtasksToCreate[1].id
            ]
        },
        {
            id: new ObjectId(),
            title: 'School Tasks',
            subtasks: [
                subtasksToCreate[2].id,
                subtasksToCreate[3].id
            ]
        }
    ]

const usersToCreate = [
    {
        username: 'john',
        passwordHash: bcrypt.hashSync('weakPass', 10),
        tasks: [tasksToCreate[0].id]
    },
    {
        username: 'james',
        passwordHash: bcrypt.hashSync('weakerPass', 10),
        tasks: [tasksToCreate[1].id]
    }
]

/**
 * make connection and add values internally, then close
 */

const helpers = {
    getTasks: () => {
        return tasksToCreate
    },
    getSubTasks: () => {
        return subtasksToCreate
    },
    getUsers: () => {
        return usersToCreate
    },
    init: async () => {
        await Currency.sync()
    },
    getUsersFromDB: async () => {
        return await User.find({})
    },
    initTestData: async () => {
        Subtask.insertMany(subtasksToCreate).then(() => {
            console.log('Subtasks created successfully!')
            Task.insertMany(tasksToCreate).then(() => {
                console.log('Tasks created successfully!')
                User.insertMany(usersToCreate).then(() => {
                    console.log('Users created successfully!')
                    // closeConnection()
                }
                )
            })
        })

    },
    removeTestData: async () => {
        Subtask.deleteMany({}).then(() => {
            console.log(`Test subtasks removed successfully`)
            Task.deleteMany({}).then(() => {
                console.log(`Test tasks removed successfully`)
                User.deleteMany({}).then(() => {
                    console.log(`Test tasks removed successfully`)
                }).catch((err) => { console.log(`Error happened when removing test data (users): ${err}`) })
            }).catch((err) => { console.log(`Error happened when removing test data (tasks): ${err}`) })
        }).catch((err) => { console.log(`Error happened when removing test data (subtasks): ${err}`) })
    }
}

module.exports = helpers