import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../authentication/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isLoggedIn()) return true;
    this.router.navigate(['./']);
    return false;
  }
}
