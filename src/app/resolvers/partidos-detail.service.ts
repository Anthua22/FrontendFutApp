import { PartidosService } from './../partidos/services/partidos.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { NEVER, Observable } from 'rxjs';
import { Partido } from '../models/models';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidosDetailService implements Resolve<Partido>{

  constructor(private partidoServicio:PartidosService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Partido | Observable<Partido> | Promise<Partido> {
    return this.partidoServicio.getPartido(route.params.id).pipe(map(x => {
      return x;
    }), catchError(error => {
      this.router.navigate(['/partidos/add']);
      return NEVER;
    }))
  }

}
