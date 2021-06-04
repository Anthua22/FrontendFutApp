import { PartidosResponse, UserResponse, UsersResponse } from './../../models/responses';
import { Partido, User } from 'src/app/models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly BASE_URL = 'users';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<UsersResponse>(`${this.BASE_URL}`).pipe(map(x => x.resultado));
  }

  getMyProfile(): Observable<User> {
    return this.httpClient.get<UserResponse>(`${this.BASE_URL}/me`).pipe(map(x => {
      x.resultado.me = true;
      return x.resultado;
    }))
  }

  getArbitrosCategoria(categoria: string): Observable<User[]> {
    return this.httpClient.post<UsersResponse>(`${this.BASE_URL}/categoria`, { categoria }).pipe(map(x => x.resultado));
  }

  getProfile(id: string): Observable<User> {
    return this.httpClient.get<UserResponse>(`${this.BASE_URL}/${id}`).pipe(map(x => x.resultado));
  }

  getPartidos(id: string): Observable<Partido[]> {
    return this.httpClient.get<PartidosResponse>(`${this.BASE_URL}/${id}/partidos`).pipe(map(x => x.resultado));
  }

  updateInfo(user: User, id?: string) {
    return id ? this.httpClient.put<UserResponse>(`${this.BASE_URL}/${id}`, user).pipe(map(x => x.resultado)) :
      this.httpClient.put<UserResponse>(`${this.BASE_URL}/me`, user).pipe(map(x => x.resultado));
  }

  updatePassword(password: string, id?: string): Observable<void> {
    return id ? this.httpClient.patch<void>(`${this.BASE_URL}/${id}/password`, { password }) :
      this.httpClient.patch<void>(`${this.BASE_URL}/me/password`, { password });

  }
}
