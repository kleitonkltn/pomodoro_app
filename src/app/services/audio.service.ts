import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  playSoundFinalTimer () {
    const audio = new Audio()
    audio.src = './assets/bleep.wav'
    audio.load()
    audio.play()
  }
}
