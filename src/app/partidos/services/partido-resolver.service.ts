import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Partido } from 'src/app/models/models';
import { PartidosService } from './partidos.service';

@Injectable({
  providedIn: 'root'
})
export class PartidoResolverService implements Resolve<Partido>{

  constructor(private partidoService: PartidosService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Partido | Observable<Partido> | Promise<Partido> {
    return this.partidoService.getPartido(route.params.id);
  }

}
