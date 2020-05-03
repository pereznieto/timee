export const playSound = (fileSource: string, volume: number = 1): void => {
  const audio: HTMLAudioElement = new Audio(fileSource)
  if (audio) {
    audio.volume = volume
    audio.play().catch(console.error)
  }
}
