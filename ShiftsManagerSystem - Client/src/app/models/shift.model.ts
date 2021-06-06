export class ShiftModel {
  public constructor(
    public shiftId?: number,
    public shiftTypeId?: number,
    public startTime?: Date,
    public endTime?: Date,
    public day?: Day,
    public nthShift?: number,
    public isPassed?: boolean
  ) { }
}

export enum Day {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday
}

