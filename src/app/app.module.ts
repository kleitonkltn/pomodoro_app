import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { TimerComponent } from './components/timer/timer.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatCommonModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component'
registerLocaleData(localePt)



@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    CustomDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
  ],
  entryComponents: [
    CustomDialogComponent,
    TimerComponent
  ],
  exports: [
    CustomDialogComponent,
    TimerComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
