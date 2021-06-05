import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UsersService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.getMyProfile().pipe(map(x=>{
        if(x.rol==='ADMIN'){
          return true;
        }else{
          return this.router.createUrlTree(['/partidos']);
        }
      }));
  }
  
}
