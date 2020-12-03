import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component'
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
  countPomodoro = 3
  countPomodoroDay = 0
  countInterval = 0
  pomodoroTime = 25
  intervalTime = 5
  longIntervalTime = 10
  minutes = 25
  pipe = new DatePipe('pt-BR')
  currentDate: string

  constructor (
    private storageService: StorageService,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

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
      this.activeIntervalTimer()
      this.countPomodoro++
      this.countPomodoroDay++
      this.storageService.setCounters({
        countPomodoro: this.countPomodoroDay,
        date: this.currentDate
      })
      if (this.countPomodoro === 4) {
        this.confirmStartLongInterval()
      }
    }
    else if (data.title === this.timeTitles[1]) {
      this.activePomodoroTimer()
      this.countInterval++
    }
    else if (data.title === this.timeTitles[2]) {
      this.activePomodoroTimer()
      this.countInterval++
    }
  }
  activeIntervalTimer () {
    this.activeTimer = this.timeTitles[1]
    this.minutes = this.intervalTime
  }
  activePomodoroTimer () {
    this.activeTimer = this.timeTitles[0]
    this.minutes = this.pomodoroTime
  }

  activeLongIntervalTimer () {
    this.activeTimer = this.timeTitles[2]
    this.minutes = this.longIntervalTime
  }
  resetCounters () {
    this.countPomodoro = 0
    this.countInterval = 0
  }
  confirmStartLongInterval () {
    this.showDialogConfirm('Vamos Descansar ?',
      'Foram concluídos 4 Pomodoros, é aconselhável um intervalo longo de 10 Minutos, Deseja Iniciar?').then((response) => {
        if (response) {
          this.activeLongIntervalTimer()
          this.countPomodoro = 0
        } else {
          this.countPomodoro = 0
        }
      })
  }

  async showDialogConfirm (title: string, msg: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '350px',
      data: { title, msg }
    })
    return await dialogRef.afterClosed().toPromise()
  }
}
