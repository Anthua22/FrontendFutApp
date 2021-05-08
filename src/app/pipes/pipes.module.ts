import { HoraPipe } from './hora.pipe';
import { FechaPipe } from './fecha.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FechaPipe, HoraPipe],
  imports: [
    CommonModule
  ],
  exports:[FechaPipe, HoraPipe]
})
export class PipesModule { }
