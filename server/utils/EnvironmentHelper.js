const dbConnectionString = () => {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return process.env.MONGODB_URI_DEVDB
        case 'test':
            return process.env.MONGODB_URI_TSTDB
    }
}

module.exports = dbConnectionString