const supertest = require('supertest')

const helpers = require('./testHelper')
const server = require('../server')
const db = require('../config/mongodb')
const api = supertest(server)

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
sleepOnTestStartMS = 5000



beforeEach(async () => {
  // Clear data and load new entries for tests

  helpers.removeTestData().then(() => {

    helpers.initTestData().then(() => console.log('Jest: removing and initializing data in test db'))
  })

})
afterAll(async () => {
  await helpers.removeTestData()
  // await db.closeConnection()
});

describe('Users tests', () => {
  beforeEach(async () => {
    // Clear data and load new entries for tests

    helpers.removeTestData().then(() => {

      helpers.initTestData().then(() => console.log('Jest: removing and initializing data in test db'))
    })

  })
  afterAll(async () => {
    await helpers.removeTestData()
    // await db.closeConnection()
  });
  test('we have 2 users at the start', async () => {
    await sleep(sleepOnTestStartMS)

    const response = await api.get('/api/users')
    console.log(response.body)

    expect(response.body).toHaveLength(2)
  }, sleepOnTestStartMS * 3);

  test('we should be able to create a user', async () => {
    await sleep(sleepOnTestStartMS)

    const response = await api.post(`/api/users`).send({
      "username": "randomUserName",
      "password": "randomPassword",
      "tasks": []
    })
    console.log(response.body)
    const usersInDb = await helpers.getUsersFromDB()

    expect(usersInDb.filter((userItem) => userItem.id === response.body.id)).toHaveLength(1)
  }, sleepOnTestStartMS * 3);
})
