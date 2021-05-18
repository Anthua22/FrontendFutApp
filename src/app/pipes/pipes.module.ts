import { HoraPipe } from './hora.pipe';
import { FechaPipe } from './fecha.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApellidoNombrePipe } from './apellido-nombre.pipe';



@NgModule({
  declarations: [FechaPipe, HoraPipe, ApellidoNombrePipe],
  imports: [
    CommonModule
  ],
  exports:[FechaPipe, HoraPipe, ApellidoNombrePipe]
})
export class PipesModule { }
