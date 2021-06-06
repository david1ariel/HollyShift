import { ShiftEmployeeModel } from '../models/shift-employee.model';
import { ShiftModel } from './../models/shift.model';
import { BusinessModel } from './../models/business-model';
import { EmployeeModel } from '../models/employee.model';
import { EmployeesPerShiftsModel } from '../models/employees-per-shifts';
import { CalendarSettingsModel } from '../models/calendarSettings.model';
import { settingModel } from '../models/setting.model';

export class AppState {
    public employees: EmployeeModel[] = [];
    public employee: EmployeeModel;
    public business: BusinessModel[] = []
    public shifts: ShiftModel[] = [];
    public futureShifts: ShiftModel[] = [];
    public shiftTypes: ShiftModel[] = [];
    public employeesPerShifts: EmployeesPerShiftsModel[] = [];
    public employeesPerShiftsForWeek: EmployeesPerShiftsModel[] = [];
    public proposedEmployeesPerShiftsOfWeek: EmployeesPerShiftsModel[] = [];
    public ShiftsEmployees: ShiftEmployeeModel[] = [];
    public employeeRequestedAssignsForNextWeek: ShiftEmployeeModel[] = [];
    public shiftsForNextWeek: ShiftModel[] = [];
    public calendarSettings: CalendarSettingsModel;
    public settings: settingModel;


    public constructor() {
        this.employee = JSON.parse(sessionStorage.getItem("employee"));
    }
}
