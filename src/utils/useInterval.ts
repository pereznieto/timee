// Adapted from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/ by Dan Abramov
import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      tick()
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [delay])
}

export default useInterval
