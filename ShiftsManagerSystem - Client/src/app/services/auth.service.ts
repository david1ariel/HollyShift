import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EmployeeModel } from '../models/employee.model';
import { environment } from '../../environments/environment';
import { store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { CredentialsModel } from '../models/credentials.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  public async register(employee: EmployeeModel): Promise<boolean> {
    try {
      const registeredEmployee = await this.Http.post<EmployeeModel>(environment.authBaseUrl + "/register", employee).toPromise();
      store.dispatch({ type: ActionType.Register, payload: registeredEmployee });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public async login(credentials: CredentialsModel): Promise<EmployeeModel> {
    try {
      const loggedInEmployee = await this.Http.post<EmployeeModel>(environment.authBaseUrl + "/login", credentials).toPromise();
      store.dispatch({ type: ActionType.Login, payload: loggedInEmployee });
      return loggedInEmployee;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      console.log(httpErrorResponse);
    }
  }

  public async forgotPassword(emailToSendVerificationCode: string):Promise<boolean> {
    try {
      await this.Http.get(environment.authBaseUrl + "/forgot-password/" + emailToSendVerificationCode).toPromise();
      return true;
    }
    catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async ConfirmVerificationCode(emailToSendVerificationCode: string, verificationCode: string): Promise<boolean>{
    try {
      await this.Http.get(environment.authBaseUrl+"/confirm-verification-code/" + emailToSendVerificationCode +"/" +verificationCode).toPromise();
      return true;
    }
    catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async setNewPassword(verificationCode: string, cerdentials: CredentialsModel): Promise<boolean>{
    try {
      const promise = await this.Http.patch("/set-new-password/"+verificationCode, cerdentials).toPromise();
      return true;
    }
    catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public logout(): void {
    store.dispatch({ type: ActionType.Logout });
  }
}
