const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000
const filePath = path.join(__dirname, 'taskList.json')

// console.log(filePath)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/tasksdb', async (req, res) => {
    await fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: "An error happened while reading the tasks' db!" })
        }
        res.json(JSON.parse(data))
    })
})

app.post('/updateTasksDb', async (req, res) => {
    const jsonData = req.body
    // console.log(typeof jsonData)

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: "An error happened while updating the tasks' db!" })
        }
        res.json({ message: 'Task db updated successfully' })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
