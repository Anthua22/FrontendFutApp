import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AddAccionMiembroPage } from './add-accion-miembro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
  declarations: [AddAccionMiembroPage]
})
export class AddAccionMiembroPageModule {}
