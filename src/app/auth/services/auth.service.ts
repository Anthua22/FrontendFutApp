import { Injectable } from '@angular/core';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/models/models';
import { TokenResponse } from 'src/app/models/responses';
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = false;
  loginChange$ = new ReplaySubject<boolean>();

  constructor(private http: HttpClient) { }

  private setLogged(logged: boolean) {
    this.logged = logged;
    this.loginChange$.next(logged);
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<TokenResponse>('auth/login', { email, password }).pipe(
      switchMap(async r => {
        try {
          await Storage.set({ key: 'token', value: r.token });
          this.setLogged(true);
        } catch (e) {
          throw new Error('No se ha podido guardar el token');
        }
      })
    );


  }

  register(user: User): Observable<void> {
    return this.http.post('auth/register', user).pipe(
      map(() => null)
    );
  }

  isLogged(): Observable<boolean> {
    return this.logged ? of(true) : of(false);
  }

  async logout(): Promise<void> {
    await Storage.remove({ key: 'fs-token' });
    this.setLogged(false);
  }

}
