import { Equipo, Partido } from './../../models/models';
import { MiembrosEquipoRespose, EquiposResponse, EquipoResponse, PartidosResponse } from './../../models/responses';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiembroEquipo } from 'src/app/models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private readonly BASE_URL = 'equipos';
  constructor(private httpClient: HttpClient) { }

  getJugadores(id: string): Observable<MiembroEquipo[]> {
    return this.httpClient.get<MiembrosEquipoRespose>(`${this.BASE_URL}/${id}/miembros_equipo/jugadores`).pipe(map(x => x.resultado));
  }

  getEquipos(): Observable<Equipo[]> {
    return this.httpClient.get<EquiposResponse>(`${this.BASE_URL}`).pipe(map(x => x.resultado));
  }

  addEquipo(equipo: Equipo): Observable<Equipo> {
    return this.httpClient.post<EquipoResponse>(`${this.BASE_URL}`, equipo).pipe(map(x => x.resultado));
  }

  getEquipo(id: string): Observable<Equipo> {
    return this.httpClient.get<EquipoResponse>(`${this.BASE_URL}/${id}`).pipe(map(x => x.resultado));
  }

  getPartidos(id: string): Observable<Partido[]> {
    return this.httpClient.get<PartidosResponse>(`${this.BASE_URL}/${id}/partidos`).pipe(map(x => x.resultado));
  }
}
