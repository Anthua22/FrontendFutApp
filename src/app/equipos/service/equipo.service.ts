import { Equipo, Partido } from './../../models/models';
import { EquiposResponse, EquipoResponse, PartidosResponse, MiembroEquipoRespose } from './../../models/responses';
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

  editEquipo(equipo: Equipo): Observable<Equipo> {
    return this.httpClient.put<EquipoResponse>(`${this.BASE_URL}/${equipo._id}`, equipo).pipe(map(x => x.resultado));
  }

  addMiembro(id: string, miembroAdd: MiembroEquipo): Observable<MiembroEquipo> {
    return this.httpClient.post<MiembroEquipoRespose>(`${this.BASE_URL}/${id}/miembros_equipo`, {
      miembro: {
        foto: miembroAdd.foto,
        nombre_completo: miembroAdd.nombre_completo,
        rol: miembroAdd.rol,
        sancionado: miembroAdd.sancionado
      }
    }).pipe(map(x => x.resultado));

  }

  deleteMiembro(idEquipo: string, idMiembro: string): Observable<MiembroEquipo> {
    return this.httpClient.delete<MiembroEquipoRespose>(`${this.BASE_URL}/${idEquipo}/miembros_equipo/${idMiembro}`).pipe(map(x => x.resultado));
  }
}
