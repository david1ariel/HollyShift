import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalendarSettingsModel } from '../models/calendarSettings.model';
import { settingModel as SettingModel } from '../models/setting.model';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  public async sendSettingsModelToServer(Settings: SettingModel):Promise<boolean> {
    try {
      await this.http.post<CalendarSettingsModel>(environment.settingsBaseUrl, Settings).toPromise();
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  public async updateSettings(Settings: SettingModel):Promise<boolean> {
    try {
      await this.http.put<CalendarSettingsModel>(environment.settingsBaseUrl, Settings).toPromise();
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getSettingsFromServer(): Promise<boolean>{
    try {
      const settings = await this.http.get<SettingModel>(environment.settingsBaseUrl).toPromise();
      store.dispatch({type: ActionType.GetOrUpdateSettings, payload: settings});
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
}
