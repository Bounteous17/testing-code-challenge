import { getPlurial, url as urlToMock } from '.'
import { BAD_REQUEST, OK } from 'http-status'
import nock from 'nock'
import axios from 'axios'
axios.defaults.adapter = 'http'

describe('exercise 2', () => {
  afterEach(() => nock.cleanAll())

  beforeEach(() => expect(nock.isDone()).toBe(true))

  describe('should not fail', () => {
    function mockResponseTotal(total: number = 10) {
      nock(urlToMock.origin).get(urlToMock.pathname).reply(OK, { total })
      expect(nock.isDone()).toBe(false)
    }

    afterEach(() => expect(nock.isDone()).toBe(true))

    it('responded total value is 0', async () => {
      mockResponseTotal(0)
      const firstValue = await getPlurial()
      expect(firstValue).toBe('none')
    })

    it('responded total value is 10', async () => {
      mockResponseTotal(10)
      const firstValue = await getPlurial()
      expect(firstValue).toBe('few')
    })

    it('responded total value is 20', async () => {
      mockResponseTotal(20)
      const firstValue = await getPlurial()
      expect(firstValue).toBe('many')
    })
  })

  describe('should fail', () => {
    it('failed response status bad request', async () => {
      const httpMock = nock(urlToMock.origin)
        .get(urlToMock.pathname)
        .reply(BAD_REQUEST, { total: 1 })

      expect(httpMock.isDone()).toBe(false)
      await expect(getPlurial).rejects.toThrow('Request failed with status 400')
      expect(httpMock.isDone()).toBe(true)
    })

    it('uknown request error like dns resolution', async () => {
      const httpMock = nock(urlToMock.origin)
        .get(urlToMock.pathname)
        .replyWithError('DNS resolution error')

      expect(httpMock.isDone()).toBe(false)
      await expect(getPlurial).rejects.toThrow(
        'Unknown error perfoming request',
      )
      expect(httpMock.isDone()).toBe(true)
    })
  })
})
