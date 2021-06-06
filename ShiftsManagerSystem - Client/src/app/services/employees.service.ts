import { ActionType } from './../redux/action-type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { store } from '../redux/store';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public async getAllEmployees(): Promise<boolean> {
    try {
      const employees = await this.http.get<EmployeeModel[]>(environment.employeesBaseUrl).toPromise();
      store.dispatch({ type: ActionType.GetAllEmployees, payload: employees });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    const formData = new FormData();
    formData.append('firstName', employee.firstName);
    formData.append('lastName', employee.lastName);
    if(employee.title)formData.append('title', employee.title);
    if(employee.birthDate)formData.append('birthDate', employee.birthDate.toString());
    if(employee.hireDate)formData.append('hireDate', employee.hireDate.toString());
    if(employee.adress)formData.append('adress', employee.adress);
    if(employee.postalCode)formData.append('postalCode', employee.postalCode.toString());
    if(employee.phone1)formData.append('phone1', employee.phone1);
    if(employee.phone2)formData.append('phone2', employee.phone2);
    if(employee.notes)formData.append('notes', employee.notes);
    if(employee.image)formData.append('image', employee.image);
    if(employee.imageFileName)formData.append('imageFileName', employee.imageFileName);
    if(employee.username)formData.append('username', employee.username);
    if(employee.password)formData.append('password', employee.password);
    if(employee.role)formData.append('role', employee.role);
    if(employee.jwtToken)formData.append('jwtToken', employee.jwtToken);
    if(employee.lastLoginDate)formData.append('lastLoginDate', employee.lastLoginDate.toString());
    if(employee.isLoggedinFirstTime)formData.append('isLoggedinFirstTime', employee.isLoggedinFirstTime.toString());
    if(employee.qualityGroup)formData.append('qualityGroup', employee.qualityGroup.toString());
    if(employee.weeklyGrade)formData.append('weeklyGrade', employee.weeklyGrade.toString());
    if(employee.contractMinShifts)formData.append('contractMinShifts', employee.contractMinShifts.toString());
    if(employee.contractMaxShifts)formData.append('contractMaxShifts', employee.contractMaxShifts.toString());
    const observable = this.http.post<EmployeeModel>(environment.employeesBaseUrl, formData);
    store.dispatch({ type: ActionType.AddEmployee, payload: employee });
    return observable.toPromise();
  }

  public async getOneEmployee(id: number): Promise<EmployeeModel> {
    const observable = await this.http.get<EmployeeModel>(environment.employeesBaseUrl + "/" + id);
    return observable.toPromise();
  }

  public async updateEmployee(employee: EmployeeModel): Promise<boolean> {
    try{
      const formData = new FormData();
      formData.append('firstName', employee.firstName);
      formData.append('lastName', employee.lastName);
      if(employee.title)formData.append('title', employee.title);
      if(employee.birthDate)formData.append('birthDate', employee.birthDate.toString());
      if(employee.hireDate)formData.append('hireDate', employee.hireDate.toString());
      if(employee.adress)formData.append('adress', employee.adress);
      if(employee.postalCode)formData.append('postalCode', employee.postalCode.toString());
      if(employee.phone1)formData.append('phone1', employee.phone1);
      if(employee.phone2)formData.append('phone2', employee.phone2);
      if(employee.notes)formData.append('notes', employee.notes);
      if(employee.image)formData.append('image', employee.image);
      if(employee.imageFileName)formData.append('imageFileName', employee.imageFileName);
      if(employee.username)formData.append('username', employee.username);
      if(employee.password)formData.append('password', employee.password);
      if(employee.role)formData.append('role', employee.role);
      if(employee.jwtToken)formData.append('jwtToken', employee.jwtToken);
      if(employee.lastLoginDate)formData.append('lastLoginDate', employee.lastLoginDate.toString());
      if(employee.isLoggedinFirstTime)formData.append('isLoggedinFirstTime', employee.isLoggedinFirstTime.toString());
      if(employee.qualityGroup)formData.append('qualityGroup', employee.qualityGroup.toString());
      if(employee.weeklyGrade)formData.append('weeklyGrade', employee.weeklyGrade.toString());
      if(employee.contractMinShifts)formData.append('contractMinShifts', employee.contractMinShifts.toString());
      if(employee.contractMaxShifts)formData.append('contractMaxShifts', employee.contractMaxShifts.toString());
      const updatedEmployee: EmployeeModel = await this.http.put<EmployeeModel>(environment.employeesBaseUrl + "/" + employee.employeeId, formData).toPromise();
      store.dispatch({ type: ActionType.UpdateEmployee, payload: updatedEmployee })
      return true;
    }
    catch(error){
      console.log(error);
      return false;
    }

  }

  public deleteEmployee(id: number): Promise<undefined> {
    const observable = this.http.delete<undefined>(environment.employeesBaseUrl + "/" + id);
    store.dispatch({ type: ActionType.DeleteEmployee, payload: id })
    return observable.toPromise();
  }
}
