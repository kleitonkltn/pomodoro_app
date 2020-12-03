import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pomodoro App'
  timeTitles = ['Pomodoro', 'Intervalo', 'Intervalo Longo']
  activeTimer = 'Pomodoro'
  countPomodoro = 0
  countInterval = 0
  pomodoroTime = 25
  intervalTime = 5
  longIntervalTime = 10
  minutes = 25

  constructor () { }

  submitForm () {
    if (this.activeTimer === this.timeTitles[0]) {
      this.minutes = this.pomodoroTime > 0 ? this.pomodoroTime : 25
    }
    if (this.activeTimer === this.timeTitles[1]) {
      this.minutes = this.intervalTime > 0 ? this.intervalTime : 5
    }
  }

  completeTime (data: any) {
    if (data.title === this.timeTitles[0]) {
      this.activeTimer = this.timeTitles[1]
      this.minutes = this.intervalTime
      this.countPomodoro++
      if (this.countPomodoro === 4) {
        // implementation long interval
      }
    }
    else if (data.title === this.timeTitles[1]) {
      this.activeTimer = this.timeTitles[0]
      this.minutes = this.pomodoroTime
      this.countInterval++
    }
  }

  resetCounters () {
    this.countPomodoro = 0
    this.countInterval = 0
  }
}
