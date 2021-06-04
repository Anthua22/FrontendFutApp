import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { NEVER, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/models';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User>{

  constructor(private userService: UsersService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    let urlpartfinal:UrlSegment = route.url[route.url.length-1];
    return route.params.id && urlpartfinal.path!=='me' ?this.userService.getProfile(route.params.id).pipe(
      catchError(() => {
        this.router.navigate(['/partidos']);
          return NEVER;
      })
    ):this.userService.getMyProfile();
  }
}
