import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { interval } from 'rxjs'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnChanges {
  @Input() title: string
  @Input() minutes: number
  @Output() onComplete = new EventEmitter()
  initialValue: number
  seconds = 0
  running = false

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
      interval(1000).subscribe(x => this.update())
    }
  }

  stop () {
    if (this.running) {
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
      } else if (this.minutes !== 0 && this.seconds === 0) {
        this.minutes--
        this.seconds = 59
      } else if (this.seconds !== 0) {
        this.seconds--
      }
    }
  }

}
