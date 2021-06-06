import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragExit, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { FutureShiftsService } from 'src/app/services/future-shifts.service';
import { EmployeesPerShiftsModel } from 'src/app/models/employees-per-shifts';
import { ShiftTypeModel } from 'src/app/models/shift-type.model';
import { ShiftTypesService } from 'src/app/services/shift-types.service';
import { DateModel } from 'src/app/models/date.model';
import { ShiftsService } from 'src/app/services/shifts.service';

@Component({
  selector: 'app-manage-work-schedule',
  templateUrl: './manage-work-schedule.component.html',
  styleUrls: ['./manage-work-schedule.component.css']
})
export class ManageWorkScheduleComponent implements OnInit, OnDestroy {

  employeesOriginal: EmployeeModel[] = [];
  employeesCopy: EmployeeModel[] = [];
  employeesPerShiftsForWeek: EmployeesPerShiftsModel[];
  proposedEmployeesPerShiftsForWeek: EmployeesPerShiftsModel[] = [];
  employeesPerShiftTypesForWeek: EmployeesPerShiftsModel[][] = [];
  shiftTypes: ShiftTypeModel[] = [];
  relevantShiftTypes: ShiftTypeModel[] = [];
  deleted: EmployeeModel[] = [];
  isShowBin = false;
  weeksCounter: number = 0;
  unsubscribe: Unsubscribe;

  constructor(
    private employeesService: EmployeesService,
    private futureShiftsService: FutureShiftsService,
    private shiftTypesService: ShiftTypesService,
    private shiftsService: ShiftsService) { }

  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.employeesOriginal = store.getState().employees;
      this.shiftTypes = store.getState().shiftTypes;
      this.employeesPerShiftsForWeek = store.getState().employeesPerShiftsForWeek;
      this.proposedEmployeesPerShiftsForWeek = store.getState().proposedEmployeesPerShiftsOfWeek;
    });
    if (store.getState().employees.length > 0) {
      this.employeesOriginal = store.getState().employees;
    }
    else {
      await this.employeesService.getAllEmployees();
    }
    if (store.getState().shiftTypes.length > 0) {
      this.shiftTypes = store.getState().shiftTypes;
    }
    else {
      await this.shiftTypesService.getAllShiftTypes();
    }
    if (store.getState().proposedEmployeesPerShiftsOfWeek.length === 0) {
      await this.shiftsService.getProposedEmployeesPerShiftsOfWeek(new DateModel(new Date()));
    }
     await this.initializeEmployeesPerShiftsPerTypesForWeek();
    this.employeesCopy = this.employeesOriginal.slice(0);
  }

  public async initializeProposedEmployeesPerShiftsPerTypesForWeek(dateToSend: Date = new Date()) {
    dateToSend.setDate(dateToSend.getDate() + (7 * this.weeksCounter));
    const diff = dateToSend.getTimezoneOffset();
    dateToSend.setMinutes(dateToSend.getMinutes() - diff);
    const date = new DateModel(dateToSend);
    await this.shiftsService.getProposedEmployeesPerShiftsOfWeek(date);
    const shiftTypeIds = new Array<number>();
    for (let item of this.proposedEmployeesPerShiftsForWeek) {
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
    for (let i = 0; i < this.relevantShiftTypes.length; i++) {
      this.employeesPerShiftTypesForWeek.push(this.employeesPerShiftsForWeek
        .filter(p => p.shift.shiftTypeId === this.relevantShiftTypes[i].shiftTypeId));
    }
  }

  public async initializeEmployeesPerShiftsPerTypesForWeek(dateToSend: Date = new Date()) {
    dateToSend.setDate(dateToSend.getDate() + (7 * this.weeksCounter));
    const diff = dateToSend.getTimezoneOffset();
    dateToSend.setMinutes(dateToSend.getMinutes() - diff);
    const date = new DateModel(dateToSend);
    await this.shiftsService.getEmployeesPerShiftsOfWeek(date);
    await this.shiftsService.getAllShiftsForNextWeek();
    const shiftTypeIds = new Array<number>();
    for (let item of this.proposedEmployeesPerShiftsForWeek) {
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
    for (let i = 0; i < this.relevantShiftTypes.length; i++) {
      this.employeesPerShiftTypesForWeek.push(this.employeesPerShiftsForWeek
        .filter(p => p.shift.shiftTypeId === this.relevantShiftTypes[i].shiftTypeId));
    }
  }

  async drop(event: CdkDragDrop<string[]>, i?: number, j?: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      if(i !== undefined && j !== undefined){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        let emps = new Array<EmployeeModel>();
        for (let emp of this.employeesPerShiftTypesForWeek[i][j].employees) {
          let isExists = false;
          for (let emp2 of emps) {
            if (emp2.employeeId === emp.employeeId) {
              isExists = true;
              break;
            }
          }
          if (isExists === false) {
            emps.push(emp);
          }
        }
        this.employeesPerShiftTypesForWeek[i][j].employees = emps;
        // await this.employeesService.getAllEmployees();
        this.employeesCopy = this.employeesOriginal.slice(0);
        this.deleted = [];
        this.isShowBin = false;
      }
      else{
        this.employeesCopy = this.employeesOriginal.slice(0);
      }
    }
  }

  dragStarted() {
    this.employeesCopy = this.employeesOriginal.slice(0);
    this.isShowBin = true;
  }

  dragEnded() {
    this.isShowBin = false;
  }

  exited(event: CdkDragExit<string[]>) {
    console.log('Exited', event.item.data);
    alert('hi');
  }

  async showPrevousWeek() {
    this.weeksCounter--;
    this.initializeEmployeesPerShiftsPerTypesForWeek();
  }

  async showNextWeek() {
    this.weeksCounter++;
    this.initializeEmployeesPerShiftsPerTypesForWeek();
  }

  public clear() {
    // this.employeeRequestedShiftsCopy = JSON.parse(JSON.stringify(this.employeeRequestedShiftsOriginal));
    // this.initShiftsAvailabilities();
  }

  submitSchedule(){

  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}


