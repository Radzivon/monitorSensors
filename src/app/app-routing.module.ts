import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SensorListComponent} from './components/sensor-list/sensor-list.component';
import {SensorEditComponent} from './components/sensor-edit/sensor-edit.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'sensors',
    component: SensorListComponent
  },
  {
    path: 'sensor/new',
    component: SensorEditComponent
  },
  {
    path: 'sensor/:id',
    component: SensorEditComponent
  },
  {
    path: ' ',
    redirectTo: 'login/'
  }, {
    path: '#',
    redirectTo: 'login/'
  }
];

@NgModule({
  imports:
    [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
