import React, { useState } from 'react'
import styles from './Timer.module.scss'
import { splitSeconds } from '../../utils/parse'
import useInterval from '../../utils/useInterval'

const INTERVAL_SPEED = 10

const Timer = () => {
  const INITIAL_TIME = 30_000
  const [remainingTime, setRemainingTime] = useState<number>(INITIAL_TIME)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [seconds, decimals] = splitSeconds(remainingTime)
  const percentageElapsed = 100 - (remainingTime * 100) / INITIAL_TIME

  const pauseOrPlay = () => {
    if (remainingTime === 0) {
      setRemainingTime(INITIAL_TIME)
    }
    setIsTimerRunning((isCurrentlyRunning) => !isCurrentlyRunning)
  }

  useInterval(
    () => {
      if (remainingTime > 0) {
        setRemainingTime((timeRemaining) => timeRemaining - INTERVAL_SPEED)
      } else {
        setIsTimerRunning(false)
      }
    },
    isTimerRunning ? INTERVAL_SPEED : null
  )

  return (
    <div className={styles.timer}>
      <div className={styles.time} onClick={pauseOrPlay}>
        <div
          className={styles.progress}
          style={{ width: `${percentageElapsed}%` }}
        />
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
