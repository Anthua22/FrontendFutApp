import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { PartidosListPage } from './partidos-list/partidos-list.page';
import { PartidoResolverService } from './services/partido-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: PartidosListPage
  },

  {
    path: 'details/:id',
    loadChildren: () => import('./detalle-partido/detalle-partido.module').then(m => m.DetallePartidoPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./partido-form/partido-form.module').then(m => m.PartidoFormPageModule),
    canActivate:[AdminGuard]
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./partido-form/partido-form.module').then(m => m.PartidoFormPageModule),
    resolve: {
      partido: PartidoResolverService
    },
    canActivate:[AdminGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidosPageRoutingModule { }
