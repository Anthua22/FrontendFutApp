import { PipesModule } from './../pipes/pipes.module';
import { SkeletonModule } from './../skeleton/skeleton.module';
import { PartidoCardComponent } from './partido-card/partido-card.component';
import { PartidosListPage } from './partidos-list/partidos-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidosPageRoutingModule } from './partidos-routing.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbAccordionModule,
    IonicModule,
    SkeletonModule,
    PartidosPageRoutingModule,
    PipesModule,
    NgxMapboxGLModule
  ],
  declarations: [PartidosListPage, PartidoCardComponent],
  exports:[PartidoCardComponent]
})
export class PartidosPageModule {}
