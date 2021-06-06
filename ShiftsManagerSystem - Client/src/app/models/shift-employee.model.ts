export class ShiftEmployeeModel {
  public constructor(
    public id?: number,
    public shiftId?: number,
    public employeeId?: string,
    public state?: State
  ) { }
}

export enum State{
  Requested,
  Proposed,
  Set
}
