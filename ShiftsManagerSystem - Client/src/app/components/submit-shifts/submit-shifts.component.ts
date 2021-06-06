import { FutureShiftsService } from 'src/app/services/future-shifts.service';
import { ShiftsService } from 'src/app/services/shifts.service';
import { ShiftEmployeeModel, State } from '../../models/shift-employee.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { EmployeesPerShiftsModel } from 'src/app/models/employees-per-shifts';
import { DateModel } from 'src/app/models/date.model';
import { ShiftTypeModel } from 'src/app/models/shift-type.model';
import { ShiftTypesService } from 'src/app/services/shift-types.service';
import { ShiftAvailabilityModel } from 'src/app/models/shift-availability.model';
import { ShfitsEmployeesUpdateModel } from 'src/app/models/shifts-employees-update.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-shifts',
  templateUrl: './submit-shifts.component.html',
  styleUrls: ['./submit-shifts.component.css']
})
export class SubmitShiftsComponent implements OnInit, OnDestroy {

  public employee = store.getState().employee;
  public unSubscribe: Unsubscribe;
  public employeesPerShiftsForWeek: EmployeesPerShiftsModel[] = [];
  public employeesPerShiftTypesForWeek: EmployeesPerShiftsModel[][] = [];
  public shiftsAvailabilities: ShiftAvailabilityModel[][] = [];
  public shiftTypes: ShiftTypeModel[] = [];
  public relevantShiftTypes: ShiftTypeModel[] = [];
  public employeeRequestedShiftsOriginal: ShiftEmployeeModel[] = [];
  public employeeRequestedShiftsCopy: ShiftEmployeeModel[] = [];
  public subscription: Subscription;
  public shfitsEmployeesUpdateModel = new ShfitsEmployeesUpdateModel(this.employee.employeeId, new Array<ShiftEmployeeModel>(), new Array<number>());
  public calendarStartDate: Date = new Date();
  public strCalendarStartDate: string;
  public weeksCounter = 0;
  public isShowTable = true;

  constructor(
    private myFutureShiftsService: FutureShiftsService,
    private shiftsService: ShiftsService,
    private shiftTypesService: ShiftTypesService) { }

  async ngOnInit() {
    this.unSubscribe = store.subscribe(() => {
      this.employee = store.getState().employee;
      this.employeesPerShiftsForWeek = store.getState().employeesPerShiftsForWeek;
      this.shiftTypes = store.getState().shiftTypes;
    })

    this.subscription = this.shiftsService.getAllEmployeeRequestedShifts(this.employee.employeeId).subscribe((employeeRequestedShifts) => {
      this.employeeRequestedShiftsOriginal = employeeRequestedShifts;
      this.employeeRequestedShiftsCopy = JSON.parse(JSON.stringify(this.employeeRequestedShiftsOriginal));
    });
    if (store.getState().shiftTypes.length > 0) {
      this.shiftTypes = store.getState().shiftTypes;
    }
    else {
      await this.shiftTypesService.getAllShiftTypes();
    }
    this.strCalendarStartDate = this.calendarStartDate.toISOString().split('T')[0];
    await this.initializeEmployeesPerShiftsPerTypesForWeek();
  }

  public async initializeEmployeesPerShiftsPerTypesForWeek(dateToSend: Date = new Date()) {
    dateToSend.setDate(dateToSend.getDate() + 7 * this.weeksCounter);
    const diff = dateToSend.getTimezoneOffset();
    dateToSend.setMinutes(dateToSend.getMinutes() - diff);
    const date = new DateModel(dateToSend);
    await this.shiftsService.getEmployeesPerShiftsOfWeek(date);
    const shiftTypeIds = new Array<number>();

    for (let item of this.employeesPerShiftsForWeek) {
      if (!shiftTypeIds.includes(item.shift.shiftTypeId))
        shiftTypeIds.push(item.shift.shiftTypeId);
    }

    this.relevantShiftTypes = [];
    for (let shiftType of this.shiftTypes) {
      if (shiftTypeIds.includes(shiftType.shiftTypeId))
        this.relevantShiftTypes.push(shiftType);
    }
    this.relevantShiftTypes.sort((a: ShiftTypeModel, b: ShiftTypeModel) => a.shiftTypeId - b.shiftTypeId);

    this.employeesPerShiftTypesForWeek = new Array<Array<EmployeesPerShiftsModel>>();
    this.shiftsAvailabilities = new Array<Array<ShiftAvailabilityModel>>();

    for (let i = 0; i < this.relevantShiftTypes.length; i++) {
      this.employeesPerShiftTypesForWeek.push(this.employeesPerShiftsForWeek
        .filter(p => p.shift.shiftTypeId === this.relevantShiftTypes[i].shiftTypeId));
      this.shiftsAvailabilities.push(new Array<ShiftAvailabilityModel>());
      for (let j = 0; j < this.employeesPerShiftTypesForWeek[i].length; j++) {
        this.shiftsAvailabilities[i].push(new ShiftAvailabilityModel(this.employeesPerShiftTypesForWeek[i][j].shift.shiftId, false));
        if (this.employeeRequestedShiftsCopy
          .includes(this.employeeRequestedShiftsCopy.find(p => p.shiftId === this.employeesPerShiftTypesForWeek[i][j].shift.shiftId)))
          this.shiftsAvailabilities[i][j].isAvailable = true;
      }
    }

    for (let i = 0; i < this.employeesPerShiftTypesForWeek.length; i++) {
      for (let j = 0; j < this.employeesPerShiftTypesForWeek[i].length; j++) {
        for (let k = 0; k < this.employeesPerShiftTypesForWeek[i][j].employees.length; k++)
          if (this.employeesPerShiftTypesForWeek[i][j].employees[k].employeeId === this.employee.employeeId) {
            this.employeesPerShiftTypesForWeek[i][j].employees[k].firstName = '';
          }
      }
    }
  }

  async showShiftsPerDate() {
    this.weeksCounter = 0;
    this.calendarStartDate = new Date(this.strCalendarStartDate);
    await this.initializeEmployeesPerShiftsPerTypesForWeek(this.calendarStartDate);
    this.initShiftsAvailabilities();
    if(this.employeesPerShiftTypesForWeek.length===0){
      this.isShowTable === false;
    }
  }

  async showPrevousWeek() {
    this.weeksCounter--;
    this.initializeEmployeesPerShiftsPerTypesForWeek();
    this.initShiftsAvailabilities();
  }

  async showNextWeek() {
    this.weeksCounter++;
    this.initializeEmployeesPerShiftsPerTypesForWeek();
    this.initShiftsAvailabilities();
  }

  public markShift(i: number, j: number) {
    if(this.shiftsAvailabilities[i][j].isAvailable){
      this.employeeRequestedShiftsCopy.splice(this.employeeRequestedShiftsCopy.findIndex(p=>p.shiftId===this.shiftsAvailabilities[i][j].shiftId),1);
    }
    else{
      this.employeeRequestedShiftsCopy.push(new ShiftEmployeeModel(0,this.shiftsAvailabilities[i][j].shiftId,this.employee.employeeId));
    }
    this.shiftsAvailabilities[i][j].isAvailable = !this.shiftsAvailabilities[i][j].isAvailable;
  }

  public convertBooleanToMark(bool: boolean): string {
    if (bool === true)
      return this.employee.firstName;
    return "";
  }

  public async submitShifts() {
    for(let item of this.employeeRequestedShiftsCopy){
      if(!this.employeeRequestedShiftsOriginal
        .includes(this.employeeRequestedShiftsOriginal.find(p=>p.shiftId===item.shiftId))){
          this.shfitsEmployeesUpdateModel.shiftsEmployeesToAdd.push(new ShiftEmployeeModel(0,item.shiftId,this.employee.employeeId))
        }
    }
    for(let item of this.employeeRequestedShiftsOriginal){
      if(!this.employeeRequestedShiftsCopy
        .includes(this.employeeRequestedShiftsCopy.find(p=>p.shiftId===item.shiftId))){
        this.shfitsEmployeesUpdateModel.shiftsEmployeesToDelete.push(item.shiftId);
      }
    }
    await this.myFutureShiftsService.updateEmployeeRequestedAssignsForNextWeek(this.shfitsEmployeesUpdateModel);

    await this.shiftsService.getAllEmployeeRequestedShifts;
  }

  private initShiftsAvailabilities() {
    this.shiftsAvailabilities = [];
    for (let i = 0; i < this.employeesPerShiftTypesForWeek.length; i++) {
      this.shiftsAvailabilities.push(new Array<ShiftAvailabilityModel>());
      for (let j = 0; j < this.employeesPerShiftTypesForWeek[i].length; j++) {
        this.shiftsAvailabilities[i].push(new ShiftAvailabilityModel(this.employeesPerShiftTypesForWeek[i][j].shift.shiftId, false));
        if (this.employeeRequestedShiftsCopy
          .includes(this.employeeRequestedShiftsCopy.find(p => p.shiftId === this.employeesPerShiftTypesForWeek[i][j].shift.shiftId)))
          this.shiftsAvailabilities[i][j].isAvailable = true;
      }
    }

    for (let i = 0; i < this.employeesPerShiftTypesForWeek.length; i++) {
      for (let j = 0; j < this.employeesPerShiftTypesForWeek[i].length; j++) {
        for (let k = 0; k < this.employeesPerShiftTypesForWeek[i][j].employees.length; k++)
          if (this.employeesPerShiftTypesForWeek[i][j].employees[k].employeeId === this.employee.employeeId) {
            this.employeesPerShiftTypesForWeek[i][j].employees[k].firstName = '';
          }
      }
    }
  }

  public clear() {

    this.employeeRequestedShiftsCopy = JSON.parse(JSON.stringify(this.employeeRequestedShiftsOriginal));
    this.initShiftsAvailabilities();
  }

  ngOnDestroy(): void {
    this.unSubscribe();
    this.subscription.unsubscribe();
  }

}
