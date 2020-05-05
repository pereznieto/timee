export const splitSeconds = (time: number): number => Math.ceil(time / 1000)

export const padZero = (time: number): string =>
  time >= 10 ? String(time) : `0${time}`
