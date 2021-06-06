import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShiftTypeModel } from '../models/shift-type.model';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ShiftTypesService {

    constructor(private http: HttpClient) { }

    public async getAllShiftTypes(): Promise<boolean> {
        try {
            const shiftTypes = await this.http.get<ShiftTypeModel[]>(environment.shiftTypesBaseUrl).toPromise();
            store.dispatch({ type: ActionType.GetAllShiftTypes, payload: shiftTypes });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }
    
    public addShiftType(shiftType: ShiftTypeModel): Promise<ShiftTypeModel> {
        const observable = this.http.post<ShiftTypeModel>(environment.shiftTypesBaseUrl, shiftType);
        store.dispatch({ type: ActionType.AddShiftType, payload: shiftType });
        return observable.toPromise();
    }

    public async getOneShiftType(id: number): Promise<ShiftTypeModel> {
        const observable = await this.http.get<ShiftTypeModel>(environment.shiftTypesBaseUrl + "/" + id);
        return observable.toPromise();
    }

    public updateShiftType(shiftType: ShiftTypeModel): Observable<ShiftTypeModel> {
        const observable = this.http.put<ShiftTypeModel>(environment.shiftTypesBaseUrl + "/" + shiftType.shiftTypeId, shiftType);
        store.dispatch({type: ActionType.UpdateShiftType, payload: shiftType})
        return observable;
    }

    public deleteShiftType(id: number): Promise<undefined> {
        const observable = this.http.delete<undefined>(environment.shiftTypesBaseUrl + "/" +id);
        store.dispatch({type: ActionType.DeleteShiftType, payload: id})
        return observable.toPromise();
    }
}
