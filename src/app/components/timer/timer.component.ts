import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { interval, Subscription } from 'rxjs'
import { AudioService } from 'src/app/services/audio.service'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnChanges {
  @Input() title: string
  @Input() minutes: number
  @Output() onComplete = new EventEmitter()
  timerSubscription: Subscription
  initialValue: number
  seconds = 0
  running = false
  constructor (private audioService: AudioService) { }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.minutes) {
      this.initialValue = this.minutes
      this.stop()
      this.reset()
    }
  }

  start () {
    if (!this.running) {
      this.running = true
      if (this.minutes === 0 && this.seconds === 0) {
        this.reset()
      }
      this.timerSubscription = interval(1000).subscribe(x => this.update())
    }
  }

  stop () {
    if (this.running) {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe()
      }
      this.running = false
    }
  }

  reset () {
    this.stop()
    this.minutes = this.initialValue
    this.seconds = 0
  }

  completeTimer () {
    this.onComplete.next({
      minutes: this.initialValue,
      title: this.title
    })
  }

  update () {
    if (this.running) {
      if (this.minutes === 0 && this.seconds === 0) {
        this.stop()
        this.completeTimer()
        this.audioService.playSoundFinalTimer()
      } else if (this.minutes !== 0 && this.seconds === 0) {
        this.minutes--
        this.seconds = 59
      } else if (this.seconds !== 0) {
        this.seconds--
      }
    }
  }

}
