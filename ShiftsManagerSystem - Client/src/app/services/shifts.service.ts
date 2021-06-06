import { DisplayShift } from './../models/display-shift.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShiftModel } from '../models/shift.model';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';
import { EmployeesPerShiftsModel } from '../models/employees-per-shifts';
import { DateModel } from '../models/date.model';
import { ShiftEmployeeModel } from '../models/shift-employee.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  constructor(private http: HttpClient) { }

  public async getAllShifts(): Promise<boolean> {
    try {
      const shifts: ShiftModel[] = await this.http.get<ShiftModel[]>(environment.pastShiftsBaseUrl).toPromise();
      console.dir(shifts);
      store.dispatch({ type: ActionType.GetAllShifts, payload: shifts });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      console.log(httpErrorResponse);
      return false;
    }
  }

  public async getAllEmployeesPerShifts(): Promise<boolean> {
    try {
      const EmployeesPerShifts: EmployeesPerShiftsModel[] = await this.http.get<EmployeesPerShiftsModel[]>(environment.employeesPerShiftsUrl).toPromise();
      store.dispatch({ type: ActionType.GetAllEmployeesPerShifts, payload: EmployeesPerShifts });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      console.log(httpErrorResponse);
      return false;
    }
  }

  public async getEmployeesPerShiftsOfWeek(startDate: DateModel): Promise<boolean> {
    try {
      const employeesPerShiftsForWeek: EmployeesPerShiftsModel[] = await this.http.post<EmployeesPerShiftsModel[]>(environment.employeesPerShiftsUrl, startDate)
      .toPromise();
      store.dispatch({ type: ActionType.GetAllEmployeesPerShiftsForWeek, payload: employeesPerShiftsForWeek });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      console.log(httpErrorResponse);
      return false;
    }
  }

  public async getProposedEmployeesPerShiftsOfWeek(startDate: DateModel): Promise<boolean> {
    try {
      const proposedEmployeesPerShiftsForWeek: EmployeesPerShiftsModel[] = await this.http.post<EmployeesPerShiftsModel[]>(environment.proposedEmployeesPerShiftsUrl, startDate).toPromise();
      store.dispatch({ type: ActionType.GetProposedEmployeesPerShiftsOfWeek, payload: proposedEmployeesPerShiftsForWeek });
      return true;
    }
    catch (httpErrorResponse) {
      console.log(httpErrorResponse);
      return false;
    }
  }

  public async getAllShiftsForNextWeek(): Promise<boolean> {
    try {
      const shiftsForNextWeek: ShiftModel[] = await this.http.get<ShiftModel[]>(environment.shiftsBaseUrl
        + "/shifts-for-next-week").toPromise();
      store.dispatch({ type: ActionType.GetAllShiftsForNextWeek, payload: shiftsForNextWeek });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      console.log(httpErrorResponse);
      return false;
    }
  }

  public getAllEmployeeRequestedShifts(employeeId: string): Observable<ShiftEmployeeModel[]> {
    try {
      const observable: Observable<ShiftEmployeeModel[]> = this.http.get<ShiftModel[]>(environment.shiftsBaseUrl
        + "/get-all-employee-requested-shifts/" + employeeId);
      return observable;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      console.log(httpErrorResponse);
    }
  }

  public addShift(shift: ShiftModel): Promise<ShiftModel> {
    const observable = this.http.post<ShiftModel>(environment.pastShiftsBaseUrl, shift);
    store.dispatch({ type: ActionType.AddShift, payload: shift });
    return observable.toPromise();
  }

  public async getOneShift(id: number): Promise<ShiftModel> {
    const observable = await this.http.get<ShiftModel>(environment.pastShiftsBaseUrl + "/" + id);
    return observable.toPromise();
  }

  public updateShift(shift: ShiftModel): Observable<ShiftModel> {
    const observable = this.http.put<ShiftModel>(environment.pastShiftsBaseUrl + "/" + shift.shiftId, shift);
    store.dispatch({ type: ActionType.UpdateShift, payload: shift })
    return observable;
  }

  public deleteShift(id: number): Promise<undefined> {
    const observable = this.http.delete<undefined>(environment.pastShiftsBaseUrl + "/" + id);
    store.dispatch({ type: ActionType.DeleteShift, payload: id })
    return observable.toPromise();
  }
}
