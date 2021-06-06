import { BusinessModel } from './../models/business-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

    constructor(private http: HttpClient) { }

    public async getAllBusiness(): Promise<boolean> {
        try {
            // Without Interceptor - we need to send JWT token on each request manually:
            const options = { headers: { Authorization: "Bearer " + store.getState().employee?.jwtToken } };
            const business = await this.http.get<BusinessModel[]>(environment.businessBaseUrl, options).toPromise();

            // With Interceptor - we don't need to handle JWT token here: 
            //const employees = await this.http.get<EmployeeModel[]>(environment.employeesBaseUrl).toPromise();
            store.dispatch({ type: ActionType.GetAllBusiness, payload: business });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    // public loadAllEmployeesFromServerAsync(): Promise<undefined> {
    //     return new Promise<undefined>((resolve, reject) => {
    //         this.http.get<EmployeeModel[]>(environment.employeesBaseUrl)
    //             .subscribe(employees => {
    //                 const action: Action = { type: ActionType.GetAllEmployees, payload: employees };
    //                 store.dispatch(action);
    //                 resolve();
    //             }, err => {
    //                 reject(err);
    //             });
    //     });
    // }

    public addBusiness(business: BusinessModel): Promise<BusinessModel> {
        const observable = this.http.post<BusinessModel>(environment.businessBaseUrl, business);
        return observable.toPromise();
    }

    public async getOneBusiness(id: number): Promise<BusinessModel> {
        const observable = await this.http.get<BusinessModel>(environment.businessBaseUrl + "/" + id);
        return observable.toPromise();
    }

    public updateBusiness(business: BusinessModel): Observable<BusinessModel> {
        const observable = this.http.put<BusinessModel>(environment.businessBaseUrl + "/" + business.businessId, business);
        return observable;
    }
}
