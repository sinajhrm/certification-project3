// I have used orchard's project from module 8 to write this file

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require('mongoose')
const dbConnectionString = require('../utils/EnvironmentHelper')
mongoose.set('strictQuery', false)

const connectionString = dbConnectionString()

const makeConnection = async () => {
    const databaseURL = connectionString
    try {
        console.log(`connecting to... ${databaseURL}`)
        await mongoose
            .connect(databaseURL)
        console.log('successful connection to MongoDB')
    } catch (error) {
        console.log('error connecting to MongoDB: ', error)
    }
}

const closeConnection = async () => {
    try {
        await mongoose.connection.close()
    } catch (error) {
        console.log('error closing connection: ', error)
    }
}

// makeConnection().then(closeConnection())

module.exports = { makeConnection, closeConnection }
