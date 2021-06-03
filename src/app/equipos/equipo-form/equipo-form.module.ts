import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoFormPageRoutingModule } from './equipo-form-routing.module';

import { EquipoFormPage } from './equipo-form.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EquipoFormPageRoutingModule,
    NgxMapboxGLModule,
    NgbAccordionModule
  ],
  declarations: [EquipoFormPage]
})
export class EquipoFormPageModule {}
