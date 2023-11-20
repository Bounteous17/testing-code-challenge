import { computeResult, url as urlToMock } from './exercise_1'
import { OK } from 'http-status'
import nock from 'nock'
import axios from 'axios'
axios.defaults.adapter = 'http'

describe('exercise 1', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('should not fail', () => {
    beforeEach(() => {
      // Mock external HTTP calls mathing the request origin and path
      nock(urlToMock.origin).get(urlToMock.pathname).reply(OK, { total: 10 })
    })

    it('add 20 units to received value 10', async () => {
      expect(nock.isDone()).toBe(false)
      await computeResult()
      expect(nock.isDone()).toBe(true)
    })
  })
})
