import React, { useState, useEffect, useRef } from 'react'
import styles from './Timer.module.scss'
import { splitSeconds, padZero } from '../../utils/parse'
import useInterval from '../../utils/useInterval'
import dingSource from '../../assets/ding.mp3'
import clingSource from '../../assets/cling.wav'
import clsx from 'clsx'

const TICK_SPEED = 10

const Timer = () => {
  const DEFAULT_DURATION = 30_000
  const RUNNING_OUT_MARK = 3_000
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION)
  const [timeLeft, setTimeLeft] = useState<number>(duration)
  const [startTime, setStartTime] = useState<number | false>(false)
  const [wasKeyPressed, setWasKeyPressed] = useState<boolean>(false)
  const seconds = splitSeconds(timeLeft)
  const percentageElapsed = 100 - (timeLeft * 100) / duration
  const shouldShowProgress = timeLeft !== duration
  const isRunningOut = timeLeft < RUNNING_OUT_MARK
  const ding = useRef(new Audio(dingSource))
  const cling = useRef(new Audio(clingSource))

  useEffect(() => {
    const upHandler = ({ key }: KeyboardEvent): void => {
      if (key === ' ' || key === 'Enter') {
        setWasKeyPressed(true)
      }
    }

    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  useEffect(() => {
    if (wasKeyPressed) {
      pauseOrPlay()
      setWasKeyPressed(false)
    }
    // eslint-disable-next-line
  }, [wasKeyPressed])

  useEffect(() => {
    if (timeLeft !== duration) {
      setTimeLeft(duration)
    }
    // eslint-disable-next-line
  }, [duration])

  useEffect(() => {
    if (startTime && [3, 2, 1].indexOf(seconds) > -1) {
      cling.current.play().catch(alert)
    }
    // eslint-disable-next-line
  }, [seconds])

  useInterval(
    () => {
      const timeDelta = Date.now() - (startTime as number)
      const timeElapsed = Math.floor(timeDelta / TICK_SPEED) * TICK_SPEED
      if (timeLeft > 0) {
        setTimeLeft(duration - timeElapsed)
      } else {
        setStartTime(false)
        ding.current.play().catch(alert)
      }
    },
    startTime ? TICK_SPEED : null
  )

  const pauseOrPlay = (): void => {
    if (timeLeft === 0) {
      setTimeLeft(duration)
    }
    if (timeLeft === 0 || timeLeft === duration) {
      setStartTime(Date.now())
    } else {
      setStartTime((isCurrentlyRunning) =>
        isCurrentlyRunning ? false : Date.now() - (duration - timeLeft)
      )
    }
  }

  const getHelperAction = (): string => {
    if (startTime) {
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
              !startTime && styles.notRunning
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
        <input
          className={styles.secondsInput}
          title="Edit duration"
          aria-label="Duration"
          name="duration"
          type="number"
          inputMode="numeric"
          min="0"
          max="999"
          value={padZero(seconds)}
          onChange={({ target: { value } }) => {
            setDuration(Number(value) * 1000)
          }}
          onClick={(event) => {
            if (!startTime) {
              event.stopPropagation()
            }
          }}
        />
        <div className={styles.footer}>This is Timee</div>
      </div>
    </div>
  )
}

export default Timer
