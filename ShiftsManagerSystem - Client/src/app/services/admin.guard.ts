import { store } from './../redux/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private mtRouter: Router) { }

    public canActivate(): boolean{
        if(store.getState().employee?.role==="admin"){
            return true;
        }
  
        this.mtRouter.navigateByUrl("/login");
        return false;
    }
  
}
