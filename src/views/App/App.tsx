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

  // const sampleExercises: Set[] = [
  //   {
  //     name: 'Get ready!',
  //     duration: 5_000,
  //   },
  //   {
  //     name: '1. Legs Down Hold',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Leg Raises',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Leg Flutters',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Bicycles',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Seated In And Outs',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Russian Twists',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Boat Hold',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Star Crunches',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Plank Side Hold – Right',
  //     duration: 30_000,
  //   },
  //   {
  //     name: '1. Plank Side Hold – Left',
  //     duration: 30_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Plank Knees to Elbows',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '1. Plank Up & Down',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Long Rest',
  //     duration: 60_000,
  //   },
  //   {
  //     name: '2. Legs Down Hold',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Leg Raises',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Leg Flutters',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Bicycles',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Seated In And Outs',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Russian Twists',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Boat Hold',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Star Crunches',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Plank Side Hold – Right',
  //     duration: 30_000,
  //   },
  //   {
  //     name: '2. Plank Side Hold – Left',
  //     duration: 30_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Plank Knees to Elbows',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '2. Plank Up & Down',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Long Rest',
  //     duration: 60_000,
  //   },
  //   {
  //     name: '3. Legs Down Hold',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Leg Raises',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Leg Flutters',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Bicycles',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Seated In And Outs',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Russian Twists',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Boat Hold',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Star Crunches',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Plank Side Hold – Right',
  //     duration: 30_000,
  //   },
  //   {
  //     name: '3. Plank Side Hold – Left',
  //     duration: 30_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Plank Knees to Elbows',
  //     duration: 45_000,
  //   },
  //   {
  //     name: 'Rest',
  //     duration: 15_000,
  //   },
  //   {
  //     name: '3. Plank Up & Down',
  //     duration: 45_000,
  //   },
  // ]

  return (
    <div>
      <Timer
      // exercises={sampleExercises}
      />
    </div>
  )
}

export default App
