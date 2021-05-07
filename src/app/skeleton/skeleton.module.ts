import { DetallePartidoSkeletonComponent } from './detalle-partido-skeleton/detalle-partido-skeleton.component';
import { PartidoSkeletonComponent } from './partido-skeleton/partido-skeleton.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PartidoSkeletonComponent, DetallePartidoSkeletonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[PartidoSkeletonComponent, DetallePartidoSkeletonComponent]
})
export class SkeletonModule { }
