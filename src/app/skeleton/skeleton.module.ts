import { PartidoSkeletonComponent } from './partido-skeleton/partido-skeleton.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PartidoSkeletonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[PartidoSkeletonComponent]
})
export class SkeletonModule { }
