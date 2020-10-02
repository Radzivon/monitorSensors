import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SensorEditComponent} from './components/sensor-edit/sensor-edit.component';
import {SensorListComponent} from './components/sensor-list/sensor-list.component';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {httpInterceptorProviders} from './interceptor/auth-interceptor.interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SensorEditComponent,
    SensorListComponent,
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FontAwesomeModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
