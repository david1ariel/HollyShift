import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CalendarSettingsModel as CalendarSettingsModel } from 'src/app/models/calendarSettings.model';
import { settingModel as SettingModel } from 'src/app/models/setting.model';
import { ShiftDetailsModel } from 'src/app/models/shift-details.model';
import { ShiftTypeModel } from 'src/app/models/shift-type.model';
import { store } from 'src/app/redux/store';
import { SettingsService } from 'src/app/services/settings.service';
import { ShiftTypesService } from 'src/app/services/shift-types.service';

@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.css']
})
export class BusinessSettingsComponent implements OnInit, OnDestroy {


  settings: SettingModel = store.getState().settings;
  calendarSettings: CalendarSettingsModel = new CalendarSettingsModel();
  calendarStartDateStr: string;
  calendarEndDateStr: string;
  unsubscribe: Unsubscribe;
  shiftTypes: ShiftTypeModel[] = [];
  isShowCreateCalendar: boolean = false;
  Shifts: number = 0;
  isShowAddShift: boolean = false;
  shiftToAdd: ShiftDetailsModel = new ShiftDetailsModel();
  shiftToEdit: ShiftDetailsModel = new ShiftDetailsModel();
  isShowEditShift: boolean[] = [];

  constructor(private settingsService: SettingsService, private shiftTypesService: ShiftTypesService) { }


  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.settings = store.getState().settings;
      this.shiftTypes = store.getState().shiftTypes;
    });

    if (!store.getState().settings)
      await this.settingsService.getSettingsFromServer();
    console.log(this.settings);

    if (store.getState().shiftTypes.length === 0)
      await this.shiftTypesService.getAllShiftTypes();

    this.calendarStartDateStr = this.settings.calendarSettingsModel.calendarStartDate.toString().substring(0, 10);
    this.calendarEndDateStr = this.settings.calendarSettingsModel.calendarEndDate.toString().substring(0, 10);

    this.isShowEditShift = new Array<boolean>(this.shiftTypes.length);
    for (let i = 0; i < this.isShowEditShift.length; i++) {
      this.isShowEditShift[i] = false;
    }
  }

  setShiftsTimesLength() {
    //   if (this.calendarSettings.shiftsDetails.length > this.calendarSettings.shiftsPerDay) {
    //     this.calendarSettings.shiftsDetails.splice(this.calendarSettings.shiftsPerDay, this.calendarSettings.shiftsDetails.length - this.calendarSettings.shiftsPerDay);
    //   }

    //   if (this.calendarSettings.shiftsDetails.length < this.calendarSettings.shiftsPerDay) {
    //     for (let i = 1; i <= this.calendarSettings.shiftsPerDay - this.calendarSettings.shiftsDetails.length; i++) {
    //       this.calendarSettings.shiftsDetails.push(new ShiftDetailsModel());
    //     }
    //   }
  }

  async sendSettingsToServer() {
    console.log(this.calendarStartDateStr);
    console.log(this.calendarEndDateStr);
    this.calendarSettings.calendarStartDate = new Date(this.calendarStartDateStr);
    this.calendarSettings.calendarEndDate = new Date(this.calendarEndDateStr);
    this.settings.calendarSettingsModel.calendarStartDate = this.calendarSettings.calendarStartDate;
    this.settings.calendarSettingsModel.calendarEndDate = this.calendarSettings.calendarEndDate;
    // this.settings.calendarSettingsModel.shiftsPerDay=this.settings.calendarSettingsModel.shiftsDetails.length;
    // for (let i = 0; i < this.calendarSettings.shiftsDetails.length; i++) {
    //   this.calendarSettings.shiftsDetails[i].nthShift = i + 1;
    // }
    console.log("Settings: ", this.calendarSettings);
    // this.settings.calendarSettingsModel = this.calendarSettings;
    // if (this.settings.isCalendarSet) {
    //   const success = await this.settingsService.updateSettings(this.settings);
    //   if (success)
    //     console.log("Settings have been set successfully!");
    //   else
    //     console.log("Some error occured during the proccess.");
    // }
    // else {
    const success = await this.settingsService.sendSettingsModelToServer(this.settings);
    if (success)
      console.log("Settings have been set successfully!");
    else
      console.log("Some error occured during the proccess.");
    // }

  }



  editShiftsCalendar() {
    this.settings.isCalendarSet = !this.settings.isCalendarSet;
  }

  toggleCreateCalendar() {
    this.isShowCreateCalendar = !this.isShowCreateCalendar;
  }
  showState() {
    console.log(this.settings.isCalendarSet);
  }

  toggleAddShift() {
    this.isShowAddShift = !this.isShowAddShift;
  }

  addShift() {
    this.settings.calendarSettingsModel.shiftsDetails.push(this.shiftToAdd);
    console.log(this.settings);
    this.toggleAddShift();
  }

  toggleEditShiftAvailable(i: number) {
    if (this.isShowEditShift[i]) {          // if before toggle is true--
      const ok = confirm('האם אתה בטוח שברצונך לצאת ממצב עריכה מבלי ששמרת את השינויים?');
      if (!ok) {  // if not ok -
        return;
      }
      this.isShowEditShift[i] = false;       // if it is ok - close
    }
    else {                                   // if before toggle is false--
      if (this.isShowEditShift.includes(true)) { //check if other shift is opened to edit. if so -
        const ok = confirm('ישנה משמרת פתוחה לעריכה שלא שמרת בה את השינויים. האם לצאת ממנה?') // confirm it's ok to cancel.
        if (!ok) // if it is not ok--
          return;
      }
      this.isShowEditShift[this.isShowEditShift.findIndex(p => p == true)] = false; // if it is ok - toogle it.
      this.isShowEditShift[i] = true; // toggle the requested shift open to edit.
      this.shiftToEdit = JSON.parse(JSON.stringify(this.settings.calendarSettingsModel.shiftsDetails[i])); // make duplicate for edit purpose
    }
  }

  saveShiftChanges(i) {
    if(this.checkNthAvailability(i)===false)
      return;
    this.settings.calendarSettingsModel.shiftsDetails[i] = this.shiftToEdit;
    this.isShowEditShift[i] = false;
  }

  checkNthAvailability(i: number) : boolean {
    if (this.shiftToEdit.nthShift < 1) {
      alert('מספר משמרת חייב להיות חיובי');
      return false;
    }
    if (this.settings.calendarSettingsModel.shiftsDetails
      .includes(this.settings.calendarSettingsModel.shiftsDetails
        .find(p => p.nthShift === this.shiftToEdit.nthShift)) && this.shiftToEdit.nthShift!==this.settings.calendarSettingsModel.shiftsDetails[i].nthShift) {
      alert('מספר זה משמש משמרת אחרת. בחר מספר פנוי');
      return false;
    }
    return true;
  }

  updateShift(i: number) {
    //todo
  }

  ngOnDestroy(): void {
    this.unsubscribe
  }
}
