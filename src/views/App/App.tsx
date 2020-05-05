import React, { useEffect } from 'react'
import Timer, { Set } from '../../components/Timer/Timer'

const App = () => {
  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
      )
    }
    setAppHeight()
    window.addEventListener('resize', setAppHeight)
    return () => {
      window.removeEventListener('resize', setAppHeight)
    }
  }, [])

  const sampleExercises: Set[] = [
    {
      name: 'Jump Rope',
      duration: 15_000,
    },
    {
      name: 'Jumping Jacks',
      duration: 15_000,
    },
    {
      name: 'Butt Kicks',
      duration: 15_000,
    },
  ]

  return (
    <div>
      <Timer />
    </div>
  )
}

export default App
