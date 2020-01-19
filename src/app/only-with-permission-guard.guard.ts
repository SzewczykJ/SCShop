import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable()
export class OnlyWithPermissionGuardGuard implements CanActivate {
    constructor(private auth: AuthService,
        private router: Router,
        private user: UserService) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        //debugger
        if (this.auth.isPrivileged()) {
            console.log(this.auth.getSpecies());
            return true
        } else {
            window.alert("You don't have permission to view this page");
            return false;
        }
    }
}
