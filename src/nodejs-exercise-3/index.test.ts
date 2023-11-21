import { getCapitalizeFirstWord } from '.'

describe('get capitalize first word', () => {
  describe('should not fail', () => {
    it('should capitalize first word only', () => {
      const name = 'àlex serra'
      const toTestResult = getCapitalizeFirstWord(name)

      /**
       * two different approaches
       */

      // using snapshots
      expect(toTestResult).toMatchSnapshot()

      // using inline comparison
      expect(toTestResult).toBe('Àlex Serra')
    })
  })

  describe('should fail', () => {
    it('the name is null', () => {
      // instead of using "".toThrow" method
      expect(getCapitalizeFirstWord).toThrowErrorMatchingSnapshot()
    })

    it('the name is empty', () => {
      // Other comparison operator "toStrictEqual"
      // More usefull for detailed objects comparison
      expect(getCapitalizeFirstWord('')).toStrictEqual('')
    })
  })
})
