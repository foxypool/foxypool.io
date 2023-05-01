import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {FormsModule} from '@angular/forms'
import { DashboardComponent } from './dashboard/dashboard.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import {ToastrModule} from 'ngx-toastr'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {LoadingStateComponent} from './loading-state/loading-state.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoadingStateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      newestOnTop: false,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
