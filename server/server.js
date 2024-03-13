require('dotenv').config()

const db = require('./config/mongodb')
const express = require('express')
const cors = require('cors')
const app = express()

const morgan = require('morgan')
const tasksRouter = require('./router/task')

app.use(cors())
app.use(express.json())

app.use(morgan('dev'))
app.use('/api', tasksRouter)

const server = async () => {
    await db.makeConnection()
    return app.listen(process.env.DEV_PORT, () => {
        console.log(`Server running on PORT: ${process.env.DEV_PORT}`)
    })
}

module.exports = server()
