
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthPageRoutingModule } from './auth-routing.module';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { ValidatorsModule } from '../validators/validators.module';
import { IonicModule } from '@ionic/angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@NgModule({
  imports: [
    CommonModule,
    ValidatorsModule,
    FormsModule,
    IonicModule,
    NgxMapboxGLModule,
    AuthPageRoutingModule
  ],
  declarations: [LoginPage, RegisterPage]
})
export class AuthPageModule {}
