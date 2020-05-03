import { splitSeconds, padZero } from './parse'

describe('parse utils', () => {
  describe('splitSeconds', () => {
    it('should return 30 seconds as the first item when the input is 30_000', () => {
      const seconds = splitSeconds(30_000)[0]
      expect(seconds).toEqual(30)
    })

    it('should return 0 decimals as the second item when the input is 30_000', () => {
      const decimals = splitSeconds(30_000)[1]
      expect(decimals).toEqual(0)
    })

    it('should return 15 seconds as the first item when the input is 15_789', () => {
      const seconds = splitSeconds(15_789)[0]
      expect(seconds).toEqual(15)
    })

    it('should return 7 decimals as the second item when the input is 15_789', () => {
      const decimals = splitSeconds(15_789)[1]
      expect(decimals).toEqual(7)
    })

    it('should return 189 seconds as the first item when the input is 189_123', () => {
      const seconds = splitSeconds(189_123)[0]
      expect(seconds).toEqual(189)
    })

    it('should return 1 decimals as the second item when the input is 189_123', () => {
      const decimals = splitSeconds(189_123)[1]
      expect(decimals).toEqual(1)
    })

    it('should return 0 seconds as the first item when the input is 1', () => {
      const seconds = splitSeconds(1)[0]
      expect(seconds).toEqual(0)
    })

    it('should return 0 decimals as the second item when the input is 1', () => {
      const decimals = splitSeconds(1)[1]
      expect(decimals).toEqual(0)
    })

    it('should return 0 seconds as the first item when the input is 100', () => {
      const seconds = splitSeconds(100)[0]
      expect(seconds).toEqual(0)
    })

    it('should return 1 decimals as the second item when the input is 1', () => {
      const decimals = splitSeconds(100)[1]
      expect(decimals).toEqual(1)
    })

    it('should return 0 seconds as the first item when the input is 0', () => {
      const seconds = splitSeconds(0)[0]
      expect(seconds).toEqual(0)
    })

    it('should return 0 decimals as the second item when the input is 0', () => {
      const decimals = splitSeconds(0)[1]
      expect(decimals).toEqual(0)
    })
  })

  describe('padZero', () => {
    it('should return unchanged stringified input when input it is more than 10', () => {
      const output = padZero(23)
      expect(output).toEqual('23')
    })

    it('should return unchanged stringified input when input equals 10', () => {
      const output = padZero(10)
      expect(output).toEqual('10')
    })

    it('should add a trailing 0 when input is less than 10', () => {
      const output = padZero(9)
      expect(output).toEqual('09')
    })

    it('should add a trailing 0 when input is less than 0', () => {
      const output = padZero(0)
      expect(output).toEqual('00')
    })

    it('should return unchanged stringified input when input is more than 99', () => {
      const output = padZero(123)
      expect(output).toEqual('123')
    })
  })
})
