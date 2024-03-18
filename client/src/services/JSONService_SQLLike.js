// I used ChatGPT to create async reading/writing of json files

// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types_SQLLike'

import { readFile, writeFile } from 'fs/promises'

/**
 *
 * @param {string} filePath
 * @returns {Types.JSONDB}
 */
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

// await testConnection()

export { readJSON, writeJSON, testConnection }
