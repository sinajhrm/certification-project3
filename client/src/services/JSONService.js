/* eslint-disable no-unused-vars */
// I used ChatGPT to create async reading/writing of json files

// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types.js'

// import { readFile, writeFile } from 'fs/promises'

/**
 *
 * @param {string} filePath
 * @returns {Types.JSONDB}
 */
async function readJSONExpress () {
    try {
        const response = await fetch('http://localhost:3000/tasksdb')
        const responseData = await response.json()
        // console.log(responseData)
        return responseData
    } catch (error) {
        console.error('Error getting data from server:', error.message)
    }
}

async function writeJSONExpress (obj) {
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

async function testConnectionExpress () {
    readJSONExpress().then((result) => {
        console.log(`Content of the current db file: \n----------------------------------------\n ${JSON.stringify(result, null, 2)} \n----------------------------------------`)
    })

    // await writeJSON_Express({ Hello: 'hello!' })
}

// await testConnection_Express()

// export { readJSONExpress, writeJSONExpress, testConnection_Express }
export { readJSONExpress, writeJSONExpress }
