/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// I used ChatGPT to create async reading/writing of json files

// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types.js'

import { readFile, writeFile } from 'fs/promises'

/**
 *
 * @param {string} filePath
 * @returns {Types.JSONDB}
 */
async function readJSON_Express () {
    try {
        const response = await fetch('http://localhost:3000/tasksdb')
        const responseData = await response.json()
        console.log(responseData)
        return responseData
    } catch (error) {
        console.error('Error getting data from server:', error.message)
    }
}

async function writeJSON_Express (obj) {
    try {
        const response = await fetch('http://localhost:3000/updateTasksDb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const responseData = await response.json()
        // console.log(responseData)
        return responseData
    } catch (error) {
        console.error('Error sending data to server:', error.message)
    }
}

async function testConnection_Express () {
    readJSON_Express().then((result) => {
        console.log(`Content of the current db file: \n----------------------------------------\n ${JSON.stringify(result, null, 2)} \n----------------------------------------`)
    })

    // await writeJSON_Express({ Hello: 'hello!' })
}

async function readJSON (filePath) {
    try {
        const data = await readFile(filePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading JSON file:', error)
        throw error
    }
}

async function writeJSON (filePath, obj) {
    try {
        await writeFile(filePath, JSON.stringify(obj, null, 2), 'utf8')
        console.log('JSON data has been written to file successfully.')
    } catch (error) {
        console.error('Error writing JSON file:', error)
        throw error
    }
}

async function testConnection (jsonFilePath = '../../data/taskList.json') {
    readJSON(jsonFilePath).then((result) => {
        console.log(`Content of the current db file: \n----------------------------------------\n ${JSON.stringify(result, null, 2)} \n----------------------------------------`)
    })
}

await testConnection_Express()

export { readJSON_Express, writeJSON_Express, testConnection_Express }
