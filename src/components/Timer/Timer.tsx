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

  const getHelperText = () => {
    const tapTo = 'Tap anywhere to'

    if (isRunning) {
      return `${tapTo} pause`
    }

    if (timeLeft === 0) {
      return `${tapTo} restart`
    }

    if (timeLeft < duration) {
      return `${tapTo} resume`
    }

    return `${tapTo} start`
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
        <div className={styles.helperText}>{getHelperText()}</div>
        <div className={styles.numberWrapper}>
          <input
            className={styles.secondsInput}
            title="Edit duration"
            aria-label="Duration"
            name="duration"
            type="number"
            min="0"
            max="99"
            value={padZero(seconds)}
            onChange={({ target: { value } }) => {
              setDuration(Number(value) * 1000)
            }}
            onClick={(event) => {
              if (!isRunning) {
                event.stopPropagation()
              }
            }}
          />
          <span className={styles.decimals}>.{decimals}</span>
        </div>
        <div className={styles.footer}>This is Timee</div>
      </div>
    </div>
  )
}

export default Timer
