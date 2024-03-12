require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const morgan = require('morgan')

app.use(cors())
app.use(express.json())

app.use(morgan('dev'))

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
})

module.exports = server // Useful later, for backend testing
