import { store } from './../redux/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private mtRouter: Router) { }

  public canActivate(): boolean{
      if(store.getState().employee){
          return true;
      }

      this.mtRouter.navigateByUrl("/login");
      return false;
  }
}
