import { CalendarSettingsModel } from "./calendarSettings.model";

export class settingModel {
  constructor(
    public minEmployeesInShift?: number,
    public maxEmployeesInShift?: number,
    public maxHoursPerWeek?: number,
    public maxHoursPerMonth?: number,
    public minHoursPerWeek?: number,
    public minHoursPerMonth?: number,
    public canEmployeesSeeEachOtherShifts?: boolean,
    public isCalendarSet?: boolean,
    public calendarSettingsModel?: CalendarSettingsModel,
  ) { }
}
