import React, { useEffect } from 'react'
import Timer, { Set } from '../../components/Timer/Timer'

const App = () => {
  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    setAppHeight()
    window.addEventListener('resize', setAppHeight)
    return () => {
      window.removeEventListener('resize', setAppHeight)
    }
  }, [])

  const sampleSet: Set[] = [
    {
      name: 'High Knee Runs',
      duration: 10_000,
    },
    {
      name: 'Rest',
      duration: 5_000,
    },
    {
      name: 'Switching Mountain Climbers',
      duration: 10_000,
    },
    {
      name: 'Rest',
      duration: 5_000,
    },
    {
      name: 'Jumping Jacks',
      duration: 10_000,
    },
    {
      name: 'Rest',
      duration: 5_000,
    },
    {
      name: 'Butt Kicks',
      duration: 10_000,
    },
    {
      name: 'Rest',
      duration: 5_000,
    },
    {
      name: 'In & Out (Open & Close)',
      duration: 10_000,
    },
    {
      name: 'Rest',
      duration: 5_000,
    },
    {
      name: 'Burpees',
      duration: 10_000,
    },
    {
      name: 'Rest',
      duration: 5_000,
    },
    {
      name: 'Bicycles',
      duration: 10_000,
    },
    {
      name: 'Rest',
      duration: 5_000,
    },
    {
      name: 'Side to Side Explosive Squats',
      duration: 10_000,
    },
  ]

  const sampleExercises: Set[] = [
    {
      name: 'Get ready!',
      duration: 5_000,
    },
    ...sampleSet,
    {
      name: 'Long Rest',
      duration: 60_000,
    },
    ...sampleSet,
    {
      name: 'Long Rest',
      duration: 60_000,
    },
    ...sampleSet,
  ]

  return (
    <div>
      <Timer
      // exercises={sampleExercises}
      />
    </div>
  )
}

export default App
