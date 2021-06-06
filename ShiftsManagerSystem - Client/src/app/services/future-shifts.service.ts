import { ShiftEmployeeModel } from '../models/shift-employee.model';
import { ActionType } from './../redux/action-type';
import { FutureShiftModel } from './../models/future-shift.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { store } from '../redux/store';
import { ShfitsEmployeesUpdateModel } from '../models/shifts-employees-update.model';

@Injectable({
  providedIn: 'root'
})
export class FutureShiftsService {

  constructor(private http: HttpClient) { }

  public async getAllShiftsEmployees(): Promise<boolean> {
    try {
      const shiftsEmployees = await this.http.get<ShiftEmployeeModel[]>(environment.futureShiftsEmployeeBaseUrl).toPromise();
      store.dispatch({ type: ActionType.GetAllFutureShiftsEmployees, payload: shiftsEmployees });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public async getAllEmployeeRequestedAssignsForNextWeek(employeeId: string): Promise<boolean> {
    try {
      const futureShiftsEmployeesById = await this.http.get<ShiftEmployeeModel[]>(environment.shiftsBaseUrl
        + "/get-all-employee-requested-assigns-for-next-week/" + employeeId).toPromise();
      store.dispatch({ type: ActionType.GetAllFutureShiftsEmployeesById, payload: futureShiftsEmployeesById });
      return true;
    }
    catch (httpErrorResponse) {
      console.log(httpErrorResponse);
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public async addEmployeeRequestedAssignsForNextWeek(shiftEmployees: ShiftEmployeeModel[]): Promise<boolean> {
    try {
      const addedShiftEmployeesAssignsForNextWeek = await this.http.post<ShiftEmployeeModel[]>(environment.shiftsBaseUrl
        + "/add-employee-requested-assigns-for-next-week", shiftEmployees).toPromise();
      if (addedShiftEmployeesAssignsForNextWeek !== null) {
        store.dispatch({ type: ActionType.addEmployeeRequestedAssignsForNextWeek, payload: addedShiftEmployeesAssignsForNextWeek })
        return true;
      }
    }
    catch (httpErrorResponse) {
      console.log(httpErrorResponse);
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public async deleteEmployeeRequestedAssignsForNextWeek(shiftEmployeesToDelete: number[]): Promise<boolean> {
    try {
      await this.http.put(environment.shiftsBaseUrl + "/delete-employee-requested-assigns-for-next-week",
        shiftEmployeesToDelete).toPromise();
      store.dispatch({ type: ActionType.DeleteEmployeeRequestedAssignsForNextWeek, payload: shiftEmployeesToDelete })
      return true;
    }
    catch (httpErrorResponse) {
      console.log(httpErrorResponse);
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public async updateEmployeeRequestedAssignsForNextWeek(shiftEmployeesToUpdate: ShfitsEmployeesUpdateModel): Promise<boolean> {
    try {
      const addedShiftEmployeesAssignsForNextWeek = await this.http.put<ShiftEmployeeModel[]>(environment.shiftsBaseUrl
        + "/update-employee-requested-assigns-for-next-week", shiftEmployeesToUpdate).toPromise();
      // store.dispatch({ type: ActionType.addEmployeeRequestedAssignsForNextWeek, payload: shiftEmployeesToUpdate })
      return true;
    }
    catch (httpErrorResponse) {
      console.log(httpErrorResponse);
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public addShiftEmployee(futureShiftEmployeeModel: ShiftEmployeeModel) {
    const observable = this.http.post<ShiftEmployeeModel>(environment.futureShiftsEmployeeBaseUrl, futureShiftEmployeeModel);
    store.dispatch({ type: ActionType.AddFutureShiftEmployee, payload: futureShiftEmployeeModel });
    return observable.toPromise();
  }


}
