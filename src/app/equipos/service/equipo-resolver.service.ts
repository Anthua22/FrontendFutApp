import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Equipo } from 'src/app/models/models';
import { EquipoService } from './equipo.service';

@Injectable({
  providedIn: 'root'
})
export class EquipoResolverService implements Resolve<Equipo>{

  constructor(private equipoService: EquipoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Equipo | Observable<Equipo> | Promise<Equipo> {
    return this.equipoService.getEquipo(route.params.id);
  }
}
