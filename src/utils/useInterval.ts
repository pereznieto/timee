// Adapted from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/ by Dan Abramov
import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
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
