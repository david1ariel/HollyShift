import { ShiftEmployeeModel } from "./shift-employee.model";

export class ShfitsEmployeesUpdateModel{
  public constructor(
    public employeeId?: string,
    public shiftsEmployeesToAdd?: ShiftEmployeeModel[],
    public shiftsEmployeesToDelete?: number[]
  ){}
}

