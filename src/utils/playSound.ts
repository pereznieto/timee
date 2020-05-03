export const playSound = (fileName: string, volume: number = 1): void => {
  const audio: HTMLAudioElement = new Audio(`/sounds/${fileName}`)
  if (audio) {
    audio.volume = volume
    audio.play().catch(console.error)
  }
}
