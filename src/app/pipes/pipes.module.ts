import { HoraPipe } from './hora.pipe';
import { FechaPipe } from './fecha.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApellidoNombrePipe } from './apellido-nombre.pipe';
import { ObtenerNombrecargoPipe } from './obtener-nombrecargo.pipe';



@NgModule({
  declarations: [FechaPipe, HoraPipe, ApellidoNombrePipe, ObtenerNombrecargoPipe],
  imports: [
    CommonModule
  ],
  exports:[FechaPipe, HoraPipe, ApellidoNombrePipe, ObtenerNombrecargoPipe]
})
export class PipesModule { }
