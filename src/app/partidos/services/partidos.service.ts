
import { PartidosResponse, PartidoResponse } from './../../models/responses';
import { Partido, PartidoAdd } from './../../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private readonly BASE_URL = 'partidos';
  constructor(private httpClient: HttpClient) { }

  getPartidos(): Observable<Partido[]> {
    return this.httpClient.get<PartidosResponse>(this.BASE_URL).pipe(
      map(resp => resp.resultado)
    );
  }

  getPartido(id: string): Observable<Partido> {
    return this.httpClient.get<PartidoResponse>(`${this.BASE_URL}/${id}`).pipe(
      map(x => x.resultado)
    );
  }

  getPartidosCategoria(categoria: string): Observable<Partido[]> {
    return this.httpClient.post<PartidosResponse>(`${this.BASE_URL}/categoria`, { categoria }).pipe(
      map(x => x.resultado)
    );
  }

  addPartido(partido: PartidoAdd): Observable<Partido> {
    return this.httpClient.post<PartidoResponse>(this.BASE_URL, partido).pipe(
      map(x => x.resultado)
    );
  }

  updatePartido(partido: PartidoAdd): Observable<Partido> {
    return this.httpClient.put<PartidoResponse>(`${this.BASE_URL}/${partido._id}`, partido).pipe(map(x => x.resultado));
  }

  deletePartido(id:string):Observable<Partido>{
    return this.httpClient.delete<PartidoResponse>(`${this.BASE_URL}/${id}`).pipe(map(x=>x.resultado));
  }

  subirActa(partido: Partido): Observable<Partido> {
    return this.httpClient.patch<PartidoResponse>(`${this.BASE_URL}/${partido._id}/acta`, {
      acta: partido.acta,
    }).pipe(map(z => z.resultado));
  }

  savePartidoJugadores(partido: Partido): Observable<void> {
    return this.httpClient.put<void>(`${this.BASE_URL}/${partido._id}/save/jugadores`, partido);
  }

  savePartidoStaff(partido: Partido): Observable<void> {
    return this.httpClient.put<void>(`${this.BASE_URL}/${partido._id}/save/staff`, partido);
  }

  saveResultado(partido: Partido): Observable<void> {
    return this.httpClient.patch<void>(`${this.BASE_URL}/${partido._id}/resultado`, { resultado: partido.resultado });
  }

  saveFaltasTM(partido: Partido): Observable<void> {
    return this.httpClient.patch<void>(`${this.BASE_URL}/${partido._id}/faltastm`, partido);
  }
}
