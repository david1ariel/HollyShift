import { environment } from 'src/environments/environment';
import { Action } from './action';
import { ActionType } from './action-type';
import { AppState } from './app-state';




export function reducer(currentState: AppState, action: Action): AppState {

  const newState: AppState = { ...currentState };

  switch (action.type) {

    case ActionType.Register:
    case ActionType.Login:
      newState.employee = action.payload;
      console.log(JSON.stringify(newState.employee));
      sessionStorage.setItem("employee", JSON.stringify(newState.employee));
      break;

    case ActionType.Logout:
      newState.employee = null;
      sessionStorage.removeItem("employee");
      break;

    case ActionType.GetAllEmployees:
      for (let e of action.payload) {
        e.imageFileName = environment.imagesBaseUrl + "/" + e.imageFileName;
      }
      newState.employees = action.payload;
      break;

    case ActionType.AddEmployee:
      newState.employees.push(action.payload);
      break;

    case ActionType.UpdateEmployee:
      const index = newState.employees.findIndex(p=>p.employeeId===action.payload.employeeId)
      newState.employees[index] = action.payload;
      newState.employees[index].imageFileName = environment.imagesBaseUrl + "/"
        + newState.employees[index].imageFileName;
      break;

    case ActionType.DeleteEmployee:
      newState.employees.slice(action.payload, 1);
      break;

    case ActionType.GetAllBusiness:
      newState.business = action.payload;
      break;

    case ActionType.AddBusiness:
      newState.business.push(action.payload);
      break;

    case ActionType.UpdateBusiness:
      newState.business[action.payload.BusinessId] = action.payload;
      break;

    case ActionType.DeleteBusiness:
      newState.business.slice(action.payload, 1);
      break;

    case ActionType.GetAllEmployeesPerShifts:
      newState.employeesPerShifts = action.payload;
      for(const item of newState.employeesPerShifts){
        for(const itme2 of item.employees){
          itme2.imageFileName = environment.imagesBaseUrl + "/" +itme2.imageFileName;
        }
      }
      break;

    case ActionType.GetAllEmployeesPerShiftsForWeek:
      newState.employeesPerShiftsForWeek = action.payload;
      for(const item of newState.employeesPerShiftsForWeek){
        for(const itme2 of item.employees){
          itme2.imageFileName = environment.imagesBaseUrl + "/" +itme2.imageFileName;
        }
      }
      break;

    case ActionType.GetProposedEmployeesPerShiftsOfWeek:
      newState.proposedEmployeesPerShiftsOfWeek = action.payload;
      for(const item of newState.proposedEmployeesPerShiftsOfWeek){
        for(const itme2 of item.employees){
          itme2.imageFileName = environment.imagesBaseUrl + "/" +itme2.imageFileName;
        }
      }
      break;

    case ActionType.GetAllShifts:
      newState.shifts = action.payload;
      break;

    case ActionType.AddShift:
      newState.shifts.push(action.payload);
      break;

    case ActionType.UpdateShift:
      newState.shifts[action.payload.ShiftsId] = action.payload;
      break;

    case ActionType.DeleteShift:
      newState.shifts.slice(action.payload, 1);
      break;

    case ActionType.GetAllFutureShifts:
      newState.futureShifts = action.payload;
      break;

    case ActionType.AddFutureShift:
      newState.futureShifts.push(action.payload);
      break;

    case ActionType.UpdateFutureShift:
      newState.futureShifts[action.payload.futureShiftsId] = action.payload;
      break;

    case ActionType.DeleteFutureShift:
      newState.futureShifts.slice(action.payload, 1);
      break;

    case ActionType.GetAllShiftTypes:
      newState.shiftTypes = action.payload;
      break;

    case ActionType.AddShiftType:
      newState.shiftTypes.push(action.payload);
      break;

    case ActionType.UpdateShiftType:
      newState.shiftTypes[action.payload.ShiftTypeId] = action.payload;
      break;

    case ActionType.DeleteShiftType:
      newState.shiftTypes.slice(action.payload, 1);
      break;

    case ActionType.addEmployeeRequestedAssignsForNextWeek:
      for (let item of action.payload)
        newState.employeeRequestedAssignsForNextWeek.push(item);
      break;

    case ActionType.DeleteEmployeeRequestedAssignsForNextWeek:
      for (let item of action.payload) {
        const itemIndex = newState.employeeRequestedAssignsForNextWeek.findIndex(p => p.shiftId === item.shiftId && p.employeeId === item.employeeId);
        newState.employeeRequestedAssignsForNextWeek.splice(itemIndex, 1);
      }
      break;

    case ActionType.UpdateEmployeeRequestedAssignsForNextWeek:
      for (let item of newState.employeesPerShiftsForWeek){
        if (action.payload.shiftsEmployeesToDelete.includes(item.shift.shiftId)){
          const index = newState.employeesPerShiftsForWeek.indexOf(item);
          const employeeIndex = newState.employeesPerShiftsForWeek[index].employees.findIndex(p=>p.employeeId===action.payload.employeeId);
          newState.employeesPerShiftsForWeek[index].employees.splice(employeeIndex, 1);
        }
      }

      for (let item of action.payload.shiftsEmployeesToAdd){
        let index;
        for (let lmnt of newState.employeesPerShiftsForWeek){
          if(lmnt.shift.shiftId===item.shiftId){
            index = newState.employeesPerShiftsForWeek.indexOf(lmnt)
            break;
          }
        }
        // newState.employeesPerShiftsForWeek[index].employees.push();
      }
      break;

    case ActionType.GetAllFutureShiftsEmployees:
      newState.employeeRequestedAssignsForNextWeek = action.payload;
      break;

    case ActionType.GetAllFutureShiftsEmployeesById:
      newState.employeeRequestedAssignsForNextWeek = action.payload;
      break;

    case ActionType.GetAllShiftsForNextWeek:
      newState.shiftsForNextWeek = action.payload;
      break;

    case ActionType.GetCalendarSettingsModel:
      newState.calendarSettings = action.payload;
      break

    case ActionType.GetOrUpdateSettings:
      newState.settings = action.payload;
      break;
  }
  return newState;
}
