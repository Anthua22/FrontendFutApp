import { Auth } from './../../models/models';
import { Injectable } from '@angular/core';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/models/models';
import { TokenResponse } from 'src/app/models/responses';
import { UsersService } from 'src/app/users/services/users.service';
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = false;
  loginChange$ = new ReplaySubject<boolean>();
  userLogueado$ = new ReplaySubject<User>();

  constructor(private http: HttpClient, private userService:UsersService) { }

  private setLogged(logged: boolean) {
    this.logged = logged;
    this.loginChange$.next(logged);
  }

  login(auth: Auth): Observable<void> {
    return this.http.post<TokenResponse>('auth/login', auth).pipe(
      switchMap(async r => {
        try {
          await Storage.set({ key: 'token', value: r.token });
          this.setLogged(true);
          this.userService.getMyProfile().subscribe(x=>{
            this.userLogueado$.next(x);
          });
        } catch (e) {
          throw new Error('No se ha podido guardar el token');
        }
      })
    );


  }

  register(arbitro: User): Observable<void> {
    return this.http.post('auth/register', arbitro).pipe(
      map(() => null)
    );
  }
  isLogged(): Observable<boolean> {
    if (this.logged) { return of(true); }
    return from(Storage.get({ key: 'token' })).pipe(
      switchMap(token => {
        if (!token.value) {
          throw new Error();
        }
        return this.http.get('auth/validate').pipe(
          map(() => {
            this.setLogged(true);
            this.userService.getMyProfile().subscribe(x=>{
              this.userLogueado$.next(x);
            });
            return true;
          }), catchError(error => {
            Storage.remove({ key: 'token' });
            return of(false);
          })
        );
      }),
      catchError(e => {
        Storage.remove({ key: 'token' });
        return of(false);
      })
    );
  }


  async logout(): Promise<void> {
    await Storage.remove({ key: 'token' });
    this.setLogged(false);
  }

}
