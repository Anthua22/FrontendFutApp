import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquiposListPage } from './equipos-list/equipos-list.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposListPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposPageRoutingModule {}
