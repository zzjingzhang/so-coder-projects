import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  CanActivateChild, 
  CanLoad, 
  Route, 
  UrlSegment, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree, 
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(childRoute);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = route.data?.['role'] as UserRole | undefined;
    
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }

  private checkAuthentication(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    const requiredRole = route.data?.['role'] as UserRole | undefined;
    const redirectTo = route.data?.['redirectTo'] as string || '/login';

    if (!this.authService.isAuthenticated) {
      const returnUrl = route.url.map(segment => segment.path).join('/');
      return this.router.createUrlTree([redirectTo], { 
        queryParams: { returnUrl } 
      });
    }

    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      return this.router.createUrlTree(['/forbidden']);
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated) {
      const returnUrl = route.queryParams['returnUrl'] || '/dashboard';
      return this.router.createUrlTree([returnUrl]);
    }
    return true;
  }
}
