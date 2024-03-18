require('dotenv').config()

const db = require('./config/mongodb')
const express = require('express')
const cors = require('cors')
const app = express()

const morgan = require('morgan')
const tasksRouter = require('./router/task')
const usersRouter = require('./router/users')
const loginRouter = require('./router/login')

const serverPort = process.env.NODE_ENV === 'dev' ? process.env.DEV_PORT : process.env.TST_PORT

app.use(cors())
app.use(express.json())

app.use(morgan('dev'))
app.use('/api/tasks', tasksRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


// const server = async () => {
//     await db.makeConnection()
//     return app.listen(serverPort, () => {
//         console.log(`Server running on PORT: ${serverPort}`)
//     })
// }

db.makeConnection().then(
    console.log('server.js: connection made!')
)
console.log(`server port is: ${serverPort}`)
module.exports = app.listen(serverPort)
