import { ShiftDetailsModel } from "./shift-details.model";

export class CalendarSettingsModel{
  public constructor(
    public calendarStartDate?: Date,
    public calendarEndDate?: Date,
    public shiftsDetails?: ShiftDetailsModel[]
  ) { }
}
