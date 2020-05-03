import React, { useState, useEffect } from 'react'
import styles from './Timer.module.scss'
import { splitSeconds, padZero } from '../../utils/parse'
import useInterval from '../../utils/useInterval'
import clsx from 'clsx'

const TICK_SPEED = 10

const Timer = () => {
  const DEFAULT_DURATION = 30_000
  const RUNNING_OUT_MARK = 4_000
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION)
  const [timeLeft, setTimeLeft] = useState<number>(duration)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [seconds, decimals] = splitSeconds(timeLeft)
  const percentageElapsed = 100 - (timeLeft * 100) / duration
  const shouldShowProgress = timeLeft !== duration
  const isRunningOut = timeLeft < RUNNING_OUT_MARK

  useEffect(() => {
    if (timeLeft !== duration) {
      setTimeLeft(duration)
    }
    // eslint-disable-next-line
  }, [duration])

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

  const pauseOrPlay = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration)
    } else if (isRunning) {
    }
    setIsRunning((isCurrentlyRunning) => !isCurrentlyRunning)
  }

  return (
    <div className={styles.timerWrapper} onClick={pauseOrPlay}>
      <div className={styles.progressWrapper}>
        {shouldShowProgress && (
          <div
            className={clsx(styles.progress, isRunningOut && styles.runningOut)}
            style={{ width: `${percentageElapsed}%` }}
          />
        )}
      </div>
      <div className={styles.timer}>
        <div className={styles.helperText}>
          Tap anywhere to {isRunning ? 'pause' : 'start'}
        </div>
        <div className={styles.numberWrapper}>
          <span className={styles.seconds}>{padZero(seconds)}</span>
          <span className={styles.point}>.</span>
          <span className={styles.decimals}>{decimals}</span>
        </div>
        <div
          className={clsx(styles.duration, isRunning && styles.disabled)}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <label className={styles.durationLabel} htmlFor="duration">
            Duration:
          </label>
          <input
            className={styles.durationInput}
            type="number"
            id="duration"
            name="duration"
            min="0"
            max="99"
            disabled={isRunning}
            value={splitSeconds(duration)[0]}
            onChange={({ target: { value } }) => {
              setDuration(Number(value) * 1000)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Timer
