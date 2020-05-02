export const splitSeconds = (time: number): [number, number] => [
  Math.floor(time / 1000),
  Math.floor((time % 1000) / 100),
]
