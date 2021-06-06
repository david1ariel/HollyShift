import { ShiftsService } from 'src/app/services/shifts.service';
import { ShiftModel } from './../../models/shift.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { EmployeesPerShiftsModel } from 'src/app/models/employees-per-shifts';
import { DateModel } from 'src/app/models/date.model';
import { ShiftTypeModel } from 'src/app/models/shift-type.model';
import { ShiftTypesService } from 'src/app/services/shift-types.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public shiftTypes: ShiftTypeModel[];
  public employeesPerShiftsForWeek: EmployeesPerShiftsModel[];
  public employeesPerShiftTypesForWeek: EmployeesPerShiftsModel[][] = [];
  public relevantShiftTypes: ShiftTypeModel[] = [];
  public shiftsForNextWeek: ShiftModel[];
  public calendarStartDate: Date = new Date();
  public strCalendarStartDate: string;

  public days: string[] = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
  public prevous = new Date();
  public weeksCounter = 0;

  public unSubscribe: Unsubscribe;
  constructor(
    private shiftsService: ShiftsService,
    private shiftTypesService: ShiftTypesService) { }

  async ngOnInit() {
    this.unSubscribe = store.subscribe(() => {
      this.shiftTypes = store.getState().shiftTypes;
      this.employeesPerShiftsForWeek = store.getState().employeesPerShiftsForWeek;
      this.shiftsForNextWeek = store.getState().shiftsForNextWeek;
    })

    if (store.getState().shiftTypes.length > 0) {
      this.shiftTypes = store.getState().shiftTypes;
    }
    else {
      await this.shiftTypesService.getAllShiftTypes();
    }

    this.strCalendarStartDate = this.calendarStartDate.toISOString().split('T')[0];
    this.initializeEmployeesPerShiftsPerTypesForWeek();
  }

  public async initializeEmployeesPerShiftsPerTypesForWeek(dateToSend: Date = new Date()) {
    dateToSend.setDate(dateToSend.getDate() + 7 * this.weeksCounter);
    const diff = dateToSend.getTimezoneOffset();
    dateToSend.setMinutes(dateToSend.getMinutes() - diff);
    const date = new DateModel(dateToSend);
    await this.shiftsService.getEmployeesPerShiftsOfWeek(date);
    await this.shiftsService.getAllShiftsForNextWeek();
    const shiftTypeIds = new Array<number>();
    for (let shift of this.shiftsForNextWeek) {
      if (!shiftTypeIds.includes(shift.shiftTypeId))
        shiftTypeIds.push(shift.shiftTypeId);
    }

    this.relevantShiftTypes = [];
    for (let shiftType of this.shiftTypes) {
      if (shiftTypeIds.includes(shiftType.shiftTypeId))
        this.relevantShiftTypes.push(shiftType);
    }
    this.relevantShiftTypes.sort((a: ShiftTypeModel, b: ShiftTypeModel) => a.shiftTypeId - b.shiftTypeId);
    this.employeesPerShiftTypesForWeek = new Array<Array<EmployeesPerShiftsModel>>();
    for (let i = 0; i < this.relevantShiftTypes.length; i++) {
      this.employeesPerShiftTypesForWeek.push(this.employeesPerShiftsForWeek
        .filter(p => p.shift.shiftTypeId === this.relevantShiftTypes[i].shiftTypeId));
    }
  }

  async showShiftsPerDate() {
    this.weeksCounter = 0;
    this.calendarStartDate = new Date(this.strCalendarStartDate);
    this.initializeEmployeesPerShiftsPerTypesForWeek(this.calendarStartDate);
  }

  async showPrevousWeek() {
    this.weeksCounter--;
    this.initializeEmployeesPerShiftsPerTypesForWeek();
  }

  async showNextWeek() {
    this.weeksCounter++;
    this.initializeEmployeesPerShiftsPerTypesForWeek();
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }
}
