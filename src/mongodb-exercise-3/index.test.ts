import { MongoClient, ObjectId } from 'mongodb'
import { environment } from '../mongodb-exercises-resources/constants'
import { updateByField } from '.'
const client = new MongoClient(environment.mongodb.uri)

describe('search exact email name match and recently logged', () => {
  const constants = {
    objectId: new ObjectId('5cd96d3ed5d3e20029627d4a'),
    emailOne: 'jest@localhost',
    emailTwo: 'mocha@localhost',
    emailThree: 'vitest@localhost',
  }

  beforeAll(async () => {
    await client.connect()
    // Fixed document id
    return client
      .db('dimatica')
      .collection('users')
      .insertMany([
        {
          _id: constants.objectId,
          email: constants.emailOne,
          first_name: 'Mocha',
          last_name: 'Test',
          roles: ['c'],
          last_connection_date: undefined,
          addresses: {},
        },
      ])
  })

  afterAll(async () => {
    await client.db('dimatica').collection('users').deleteMany({})
    return client.close()
  })

  describe('should not fail', () => {
    async function findUser() {
      return client
        .db('dimatica')
        .collection('users')
        .findOne({ _id: constants.objectId })
    }

    it('updates the expected values', async () => {
      // update last_connection_date
      expect(await findUser()).toMatchObject({
        last_connection_date: null,
      })
      const currentDate = new Date()
      await updateByField({
        client,
        _id: constants.objectId,
        field: 'last_connection_date',
        value: currentDate,
      })
      expect(await findUser()).toMatchObject({
        last_connection_date: currentDate,
      })

      // update role
      expect(await findUser()).toMatchObject({
        roles: ['c'],
      })
      await updateByField({
        client,
        _id: constants.objectId,
        field: 'roles',
        value: 'admin',
      })
      expect(await findUser()).toMatchObject({
        roles: ['admin'],
      })

      // update zip
      expect(await findUser()).toMatchObject({
        addresses: {},
      })
      await updateByField({
        client,
        _id: constants.objectId,
        field: 'addresses',
        value: {
          zip: 75001,
          city: 'Paris 1',
        },
      })
      expect(await findUser()).toMatchObject({
        addresses: {
          zip: 75001,
          city: 'Paris 1',
        },
      })
    })
  })
})
