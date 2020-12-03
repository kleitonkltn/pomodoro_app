import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NotificationService } from './services/notification.service'
import { StorageService } from './services/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pomodoro App'
  timeTitles = ['Pomodoro', 'Intervalo', 'Intervalo Longo']
  activeTimer = 'Pomodoro'
  countPomodoro = 0
  countPomodoroDay = 0
  countInterval = 0
  pomodoroTime = 25
  intervalTime = 5
  longIntervalTime = 10
  minutes = 25
  pipe = new DatePipe('pt-BR')
  currentDate: string

  constructor (private storageService: StorageService, private notificationService: NotificationService) { }

  ngOnInit () {
    this.currentDate = this.pipe.transform(new Date(), 'dd/MM/yyyy')
    this.notificationService.requestPermission()
    this.verifyCounterPomodoroDay()
  }

  verifyCounterPomodoroDay () {
    const data = this.storageService.getCounters()
    if (!data || data.date !== this.currentDate) {
      this.storageService.setCounters({ countPomodoro: 0, date: this.currentDate })
      this.countPomodoroDay = 0
    } else {
      this.countPomodoroDay = data.countPomodoro
    }
  }

  submitForm () {
    if (this.activeTimer === this.timeTitles[0]) {
      this.minutes = this.pomodoroTime > 0 ? this.pomodoroTime : 25
    }
    if (this.activeTimer === this.timeTitles[1]) {
      this.minutes = this.intervalTime > 0 ? this.intervalTime : 5
    }
  }

  completeTime (data: any) {
    this.notificationService.sendNotification(`${data.title} - Timer Finalizado`)
    if (data.title === this.timeTitles[0]) {
      this.activeTimer = this.timeTitles[1]
      this.minutes = this.intervalTime
      this.countPomodoro++
      this.countPomodoroDay++
      this.storageService.setCounters({
        countPomodoro: this.countPomodoroDay,
        date: this.currentDate
      })
      if (this.countPomodoro === 4) {

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
