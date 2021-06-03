import { DetallePartidoSkeletonComponent } from './detalle-partido-skeleton/detalle-partido-skeleton.component';
import { PartidoSkeletonComponent } from './partido-skeleton/partido-skeleton.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EquipoSkeletonComponent } from './equipo-skeleton/equipo-skeleton.component';



@NgModule({
  declarations: [PartidoSkeletonComponent, DetallePartidoSkeletonComponent, EquipoSkeletonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[PartidoSkeletonComponent, DetallePartidoSkeletonComponent,EquipoSkeletonComponent]
})
export class SkeletonModule { }
