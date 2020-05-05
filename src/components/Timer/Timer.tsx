import React, { useState, useEffect, useRef } from 'react'
import styles from './Timer.module.scss'
import { splitSeconds, padZero } from '../../utils/parse'
import useInterval from '../../utils/useInterval'
import { playSound } from '../../utils/playSound'
import ding from '../../assets/ding.mp3'
import cling from '../../assets/cling.wav'
import clsx from 'clsx'

const TICK_SPEED = 10

const Timer = () => {
  const DEFAULT_DURATION = 30_000
  const RUNNING_OUT_MARK = 4_000
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION)
  const [timeLeft, setTimeLeft] = useState<number>(duration)
  const [runningStartTime, setRunningStartTime] = useState<number | false>(
    false
  )
  const [wasSpacePressed, setWasSpacePressed] = useState<boolean>(false)
  const seconds = splitSeconds(timeLeft)
  const percentageElapsed = 100 - (timeLeft * 100) / duration
  const shouldShowProgress = timeLeft !== duration
  const isRunningOut = timeLeft < RUNNING_OUT_MARK
  const dingAudio = useRef(new Audio(ding))

  useEffect(() => {
    if (timeLeft !== duration) {
      setTimeLeft(duration)
    }
    // eslint-disable-next-line
  }, [duration])

  useEffect(() => {
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === ' ') {
      setWasSpacePressed(true)
    }
  }

  useEffect(() => {
    if (wasSpacePressed) {
      pauseOrPlay()
      setWasSpacePressed(false)
    }
    // eslint-disable-next-line
  }, [wasSpacePressed])

  useInterval(
    () => {
      const delta = Date.now() - (runningStartTime as number)
      const timeElapsed = Math.floor(delta / TICK_SPEED) * TICK_SPEED
      if (timeLeft > 0) {
        setTimeLeft(duration - timeElapsed)
        if ([3_000, 2_000, 1_000].indexOf(timeLeft) > -1) {
          playSound(cling)
        }
      } else {
        setRunningStartTime(false)
        dingAudio.current.play().catch(alert)
      }
    },
    runningStartTime ? TICK_SPEED : null
  )

  const pauseOrPlay = (): void => {
    // dingAudio.current.play()
    if (timeLeft === 0) {
      setTimeLeft(duration)
      setRunningStartTime(Date.now())
    } else {
      if (timeLeft === duration) {
        setRunningStartTime(Date.now())
      } else {
        setRunningStartTime((isCurrentlyRunning) =>
          isCurrentlyRunning ? false : Date.now() - (duration - timeLeft)
        )
      }
    }
  }

  const getHelperAction = (): string => {
    if (runningStartTime) {
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
              !runningStartTime && styles.notRunning
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
            if (!runningStartTime) {
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
