import React, { useState } from 'react'
import styles from './Timer.module.scss'
import { splitSeconds } from '../../utils/parse'
import useInterval from '../../utils/useInterval'
import clsx from 'clsx'

const INTERVAL_SPEED = 10

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState<number>(30_000)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [seconds, decimals] = splitSeconds(remainingTime)

  const pauseOrPlay = () => {
    setIsTimerRunning((isCurrentlyRunning) => !isCurrentlyRunning)
  }

  useInterval(
    () => {
      setRemainingTime((timeRemaining) => timeRemaining - INTERVAL_SPEED)
    },
    isTimerRunning ? INTERVAL_SPEED : null
  )

  return (
    <div className={styles.timer}>
      <div
        className={clsx(styles.time, isTimerRunning && styles.running)}
        onClick={pauseOrPlay}
      >
        <span className={styles.seconds}>{seconds}</span>
        <span className={styles.point}>.</span>
        <span className={styles.decimals}>{decimals}</span>
      </div>
    </div>
  )
}

export default Timer
