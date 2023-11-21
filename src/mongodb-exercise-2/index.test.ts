import { MongoClient } from 'mongodb'
import { environment } from '../mongodb-exercises-resources/constants'
import { searchByRoleAndEmailsMatch } from '.'
const client = new MongoClient(environment.mongodb.uri)

describe('search exact email name match and recently logged', () => {
  const constants = {
    emailOne: 'jest@localhost',
    emailTwo: 'mocha@localhost',
    emailThree: 'vitest@localhost',
  }

  beforeAll(async () => {
    await client.connect()
    // Perfect mix of data for avoiding bugs on the query
    return client
      .db('dimatica')
      .collection('users')
      .insertMany([
        {
          email: constants.emailOne,
          first_name: 'Mocha',
          last_name: 'Test',
          roles: ['c'],
          last_connection_date: new Date(),
        },
        {
          email: constants.emailTwo,
          first_name: 'Jest Legacy',
          last_name: 'Test',
          roles: ['a'],
          last_connection_date: new Date(),
        },
        {
          email: constants.emailTwo,
          first_name: 'Jest Latest',
          last_name: 'Test',
          roles: ['b'],
          last_connection_date: new Date(),
        },
        {
          email: constants.emailTwo,
          first_name: 'Jest Latest',
          last_name: 'Test',
          roles: ['c'],
          last_connection_date: new Date(),
        },
        {
          email: constants.emailThree,
          first_name: 'Vitest Beta',
          last_name: 'Test',
          roles: ['c'],
          last_connection_date: new Date(),
        },
      ])
  })

  afterAll(async () => {
    await client.db('dimatica').collection('users').deleteMany({})
    return client.close()
  })

  describe('should not fail', () => {
    it('return only jest latest version user that logged in recently', async () => {
      const data = await searchByRoleAndEmailsMatch({
        client,
        role: 'c',
        emails: [constants.emailTwo, constants.emailThree],
      })
      expect(data).toHaveLength(2)
      // also using "toMatchInlineSnapshot" is a great solution, this one is less visual but cleaner
      expect(data).toMatchObject([
        {
          email: 'mocha@localhost',
          first_name: 'Jest Latest',
          last_name: 'Test',
          roles: ['c'],
        },
        {
          email: 'vitest@localhost',
          first_name: 'Vitest Beta',
          last_name: 'Test',
          roles: ['c'],
        },
      ])
    })
  })
})
