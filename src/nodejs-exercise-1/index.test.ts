import { computeResult, url as urlToMock } from '.'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import nock from 'nock'
import axios from 'axios'
axios.defaults.adapter = 'http'

describe('exercise 1', () => {
  afterEach(() => nock.cleanAll())

  beforeEach(() => expect(nock.isDone()).toBe(true))

  describe('should not fail', () => {
    function mockResponseTotal(total: number = 10) {
      nock(urlToMock.origin).get(urlToMock.pathname).reply(OK, { total })
      expect(nock.isDone()).toBe(false)
    }

    afterEach(() => expect(nock.isDone()).toBe(true))

    it('add 20 units to received value 10', async () => {
      mockResponseTotal()
      const firstValue = await computeResult()
      expect(firstValue).toBe(30)
    })

    it('add 2 units to received value 10', async () => {
      mockResponseTotal(2)
      const firstValue = await computeResult()
      expect(firstValue).toBe(22)
    })
  })

  describe('should fail', () => {
    it('failed response status internal server error', async () => {
      const httpMock = nock(urlToMock.origin)
        .get(urlToMock.pathname)
        .reply(INTERNAL_SERVER_ERROR, { total: 1 })

      expect(httpMock.isDone()).toBe(false)
      await expect(computeResult).rejects.toThrow(
        'Request failed with status 500',
      )
      expect(httpMock.isDone()).toBe(true)
    })

    it('response total type is not a number', async () => {
      const httpMock = nock(urlToMock.origin)
        .get(urlToMock.pathname)
        .reply(OK, { total: 'cat' })

      expect(httpMock.isDone()).toBe(false)
      await expect(computeResult).rejects.toThrow(
        'Expected value is not a number, we received: cat',
      )
      expect(httpMock.isDone()).toBe(true)
    })
  })
})
