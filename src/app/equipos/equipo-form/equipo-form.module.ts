import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoFormPage } from './equipo-form.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EquipoFormPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxMapboxGLModule,
    NgbAccordionModule
  ],
  declarations: [EquipoFormPage]
})
export class EquipoFormPageModule {}
