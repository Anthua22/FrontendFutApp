import { UserResponse } from './../../models/responses';
import { User } from 'src/app/models/models';
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

  getMyProfile(): Observable<User> {
    return this.httpClient.get<UserResponse>(`${this.BASE_URL}/me`).pipe(map(x => x.resultado))
  }
}
