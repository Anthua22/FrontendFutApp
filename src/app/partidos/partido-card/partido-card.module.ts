import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { PartidoCardPage } from './partido-card.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PartidoCardPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NgbAccordionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PartidoCardPage],
  exports: [PartidoCardPage]
})
export class PartidoCardPageModule { }
