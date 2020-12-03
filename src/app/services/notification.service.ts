import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor () {

  }

  requestPermission () {
    if (Notification.permission.toString() === 'default' || Notification.permission.toString() === 'denied') {
      window.Notification.requestPermission()
    }
  }

  sendNotification (title: string, data: NotificationOptions = {}) {
    data.icon = './assets/pomodoro_icon.png'
    const notification = new Notification(title, data)
    setTimeout(() => {
      notification.close()
    }, 3000)
  }

}
