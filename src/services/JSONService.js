import { readFile, writeFile } from 'fs/promises'

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

async function testConnection () {
    readJSON('./data/taskList.json').then((result) => {
        console.log(`Content of the current db file: \n----------------------------------------\n ${JSON.stringify(result, null, 2)} \n----------------------------------------`)
    })
}

await testConnection()

export { readJSON, writeJSON }
