import { Injectable } from '@angular/core'
import { PomodoroCounter } from '../models/PomodoroCounter'


@Injectable({
  providedIn: 'root'
})

export class StorageService {
  static KEY_TIMER = 'pomodoro_counter'

  setCounters (data: PomodoroCounter) {
    localStorage.setItem(StorageService.KEY_TIMER, JSON.stringify(data))
  }
  getCounters (): PomodoroCounter {
    return JSON.parse(localStorage.getItem(StorageService.KEY_TIMER))
  }
}
