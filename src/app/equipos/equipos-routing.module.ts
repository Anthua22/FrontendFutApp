import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquiposListPage } from './equipos-list/equipos-list.page';
import { EquipoResolverService } from './service/equipo-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EquiposListPage
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./detalle-equipo/detalle-equipo.module').then( m => m.DetalleEquipoPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./equipo-form/equipo-form.module').then( m => m.EquipoFormPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./equipo-form/equipo-form.module').then( m => m.EquipoFormPageModule),
    resolve:{
      equipo:EquipoResolverService
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposPageRoutingModule {}
