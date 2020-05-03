import React, { useEffect } from 'react'
import Timer from '../../components/Timer/Timer'

const App = () => {
  const setAppHeight = () => {
    const element = document.documentElement
    element.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  useEffect(() => {
    setAppHeight()
    window.addEventListener('resize', setAppHeight)

    return () => {
      window.removeEventListener('resize', setAppHeight)
    }
  }, [])

  return (
    <div>
      <Timer />
    </div>
  )
}

export default App
