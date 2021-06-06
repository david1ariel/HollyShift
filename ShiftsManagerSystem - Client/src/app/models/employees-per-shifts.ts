import { EmployeeModel } from "./employee.model";
import { ShiftModel } from "./shift.model";

export class EmployeesPerShiftsModel{
  constructor(
    public employees: EmployeeModel[],
    public shift: ShiftModel
  ){}
}
