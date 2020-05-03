export const splitSeconds = (time: number): [number, number] => [
  Math.floor(time / 1000),
  Math.floor((time % 1000) / 100),
]

export const padZero = (time: number): string =>
  time >= 10 ? String(time) : `0${time}`
