import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { EquiposListPage } from './equipos-list/equipos-list.page';
import { EquipoResolverService } from './service/equipo-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EquiposListPage,
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./detalle-equipo/detalle-equipo.module').then(
        (m) => m.DetalleEquipoPageModule
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./equipo-form/equipo-form.module').then(
        (m) => m.EquipoFormPageModule
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./equipo-form/equipo-form.module').then(
        (m) => m.EquipoFormPageModule
      ),
    resolve: {
      equipo: EquipoResolverService,
    },
    canActivate: [AdminGuard],
  },
  {
    path: 'add-miembro',
    loadChildren: () =>
      import('./add-miembro/add-miembro.module').then(
        (m) => m.AddMiembroPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposPageRoutingModule {}
