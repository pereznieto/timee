import React, { useState } from 'react'
import styles from './Timer.module.scss'
import { splitSeconds } from '../../utils/parse'
import useInterval from '../../utils/useInterval'

const TICK_SPEED = 10

const Timer = () => {
  const INITIAL_TIME = 30_000
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [seconds, decimals] = splitSeconds(timeLeft)
  const percentageElapsed = 100 - (timeLeft * 100) / INITIAL_TIME

  const pauseOrPlay = () => {
    if (timeLeft === 0) {
      setTimeLeft(INITIAL_TIME)
    }
    setIsRunning((isCurrentlyRunning) => !isCurrentlyRunning)
  }

  useInterval(
    () => {
      if (timeLeft > 0) {
        setTimeLeft((timeRemaining) => timeRemaining - TICK_SPEED)
      } else {
        setIsRunning(false)
      }
    },
    isRunning ? TICK_SPEED : null
  )

  const progressStyle = {
    width: `${percentageElapsed}%`,
    animation: isRunning ? `redden ${INITIAL_TIME / 1000}s ease-out` : '',
  }

  return (
    <div className={styles.timer}>
      <div className={styles.time} onClick={pauseOrPlay}>
        <div className={styles.progress} style={progressStyle} />
        <div className={styles.numberWrapper}>
          <span className={styles.seconds}>{seconds}</span>
          <span className={styles.point}>.</span>
          <span className={styles.decimals}>{decimals}</span>
        </div>
      </div>
    </div>
  )
}

export default Timer
