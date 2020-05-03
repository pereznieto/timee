import React, { useState, useEffect } from 'react'
import styles from './Timer.module.scss'
import { splitSeconds, padZero } from '../../utils/parse'
import useInterval from '../../utils/useInterval'
import { playSound } from '../../utils/playSound'
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
        if ([3_000, 2_000, 1_000].indexOf(timeLeft) > -1) {
          playSound('cling.wav')
        }
      } else {
        setIsRunning(false)
        playSound('ding.mp3')
      }
    },
    isRunning ? TICK_SPEED : null
  )

  const pauseOrPlay = (): void => {
    if (timeLeft === 0) {
      setTimeLeft(duration)
    } else if (isRunning) {
    }
    setIsRunning((isCurrentlyRunning) => !isCurrentlyRunning)
  }

  const getHelperAction = (): string => {
    if (isRunning) {
      return 'pause'
    }

    if (timeLeft === 0) {
      return 'restart'
    }

    if (timeLeft < duration) {
      return 'resume'
    }

    return 'start'
  }

  return (
    <div className={styles.timerWrapper} onClick={pauseOrPlay}>
      <div className={styles.progressWrapper}>
        {shouldShowProgress && (
          <div
            className={clsx(
              styles.progress,
              isRunningOut && styles.runningOut,
              !isRunning && styles.notRunning
            )}
            style={{ width: `${percentageElapsed}%` }}
          />
        )}
      </div>
      <div className={styles.timer}>
        <div className={styles.helperText}>
          Tap anywhere to{' '}
          <span className={styles.helperAction}>{getHelperAction()}</span>
        </div>
        <div>
          <input
            className={styles.secondsInput}
            title="Edit duration"
            aria-label="Duration"
            name="duration"
            type="number"
            inputMode="numeric"
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
