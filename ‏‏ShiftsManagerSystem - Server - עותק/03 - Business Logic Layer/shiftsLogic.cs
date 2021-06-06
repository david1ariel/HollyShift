using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CtrlShift
{
    public class ShiftsLogic : BaseLogic
    {
        private readonly EmployeesLogic EmployeesLogic;

        public ShiftsLogic(TomediaShiftsManagementContext DB, EmployeesLogic employeesLogic) : base(DB)
        {
            EmployeesLogic = employeesLogic;
        }



        public List<ShiftModel> GetAllShifts()
        {
            List<ShiftModel> shifts = DB.Shifts.Select(p => new ShiftModel(p)).ToList();
            return shifts;
        }

        public ShiftModel GetSingleShift(int id)
        {
            return new ShiftModel(DB.Shifts.SingleOrDefault(p => p.ShiftId == id));
        }

        public ShiftModel AddShiftModel(ShiftModel pastShiftModel)
        {
            Shift pastShift = pastShiftModel.ConvertToShift();
            DB.Shifts.Add(pastShift);
            DB.SaveChanges();
            pastShiftModel.ShiftId = pastShift.ShiftId;
            return pastShiftModel;
        }

        public ShiftModel UptdateFullShift(ShiftModel pastShiftModel)
        {
            Shift pastShift = DB.Shifts.SingleOrDefault(e => e.ShiftId == pastShiftModel.ShiftId);
            if (pastShift == null)
                return null;
            pastShift.ShiftTypeId = pastShiftModel.ShiftTypeId;
            pastShift.StartTime = pastShiftModel.StartTime;
            pastShift.EndTime = pastShiftModel.EndTime;

            DB.SaveChanges();
            return pastShiftModel;
        }

        public ShiftModel UptdatePartialShift(ShiftModel pastShiftModel)
        {
            Shift pastShift = DB.Shifts.SingleOrDefault(p => p.ShiftId == pastShiftModel.ShiftId);
            if (pastShift == null)
                return null;

            if (pastShift.ShiftTypeId != 0)
                pastShift.ShiftTypeId = pastShiftModel.ShiftTypeId;

            if (pastShift.StartTime != null)
                pastShift.StartTime = pastShiftModel.StartTime;

            if (pastShift.EndTime != null)
                pastShift.EndTime = pastShiftModel.EndTime;

            if (pastShift.NthShift != 0)
                pastShift.NthShift = pastShiftModel.NthShift;

            DB.SaveChanges();
            return pastShiftModel;
        }

        public void DeleteShift(int id)
        {
            Shift pastShiftToDelete = DB.Shifts.SingleOrDefault(p => p.ShiftId == id);
            if (pastShiftToDelete == null)
                return;
            DB.Shifts.Remove(pastShiftToDelete);
            DB.SaveChanges();
        }


        public List<ShiftTypeModel> GetAllShiftTypes()
        {
            return DB.ShiftTypes.Select(p => new ShiftTypeModel(p)).ToList();
        }

        public ShiftTypeModel GetSingleShiftType(int id)
        {
            return new ShiftTypeModel(DB.ShiftTypes.SingleOrDefault(p => p.ShiftTypeId == id));
        }

        public ShiftTypeModel AddShiftTypeModel(ShiftTypeModel shiftTypeModel)
        {
            ShiftType shiftType = shiftTypeModel.ConvertToShiftType();
            DB.ShiftTypes.Add(shiftType);
            DB.SaveChanges();
            shiftTypeModel.ShiftTypeId = shiftType.ShiftTypeId;
            return shiftTypeModel;
        }

        public ShiftTypeModel UptdateFullShiftType(ShiftTypeModel shiftTypeModel)
        {
            ShiftType futureShift = DB.ShiftTypes.SingleOrDefault(s => s.ShiftTypeId == shiftTypeModel.ShiftTypeId);
            if (futureShift == null)
                return null;
            futureShift.TypeTitle = shiftTypeModel.TypeTitle;


            DB.SaveChanges();
            return shiftTypeModel;
        }

        public ShiftTypeModel UptdatePartialShiftType(ShiftTypeModel shiftTypeModel)
        {
            ShiftType shiftType = DB.ShiftTypes.SingleOrDefault(s => s.ShiftTypeId == shiftTypeModel.ShiftTypeId);
            if (shiftType == null)
                return null;

            if (shiftType.TypeTitle != null)
                shiftType.TypeTitle = shiftTypeModel.TypeTitle;



            DB.SaveChanges();
            return shiftTypeModel;
        }

        public void DeleteShiftType(int id)
        {
            ShiftType shiftTypeToDelete = DB.ShiftTypes.SingleOrDefault(p => p.ShiftTypeId == id);
            if (shiftTypeToDelete == null)
                return;
            DB.ShiftTypes.Remove(shiftTypeToDelete);
            DB.SaveChanges();
        }


        public List<EmployeesPerShifts> GetAllEmployeesPerShifts()
        {
            var employeesPerShifts = new List<EmployeesPerShifts>();

            foreach (var item in DB.Shifts)
            {
                var employeesToAdd = DB.Employees
                    .Join(
                        DB.ShiftsEmployees
                            .Where(p => p.ShiftId == item.ShiftId),
                        employee => employee.EmployeeId,
                        shiftEmployee => shiftEmployee.EmployeeId,
                        (employee, shiftEmployee) => employee)
                    .ToList();

                EmployeesPerShifts employeesPerShiftsToAdd = new EmployeesPerShifts
                {
                    Shift = new ShiftModel(item),
                    Employees = employeesToAdd
                        .Distinct(new EmployeeComparer())
                        .Select(p=>new EmployeeModel(p))
                        .ToList()
                };
                employeesPerShifts.Add(employeesPerShiftsToAdd);
            }
            return employeesPerShifts;
        }

        public List<EmployeesPerShifts> GetAllEmployeesPerShiftsOfWeek(DateModel date)
        {
            if (date.startDate == null)
            {
                date.startDate = DateTime.Now;
            }
            int dayOfWeek = Convert.ToInt32(date.startDate.DayOfWeek);
            int hours = date.startDate.Hour;
            int minutes = date.startDate.Minute;

            date.startDate = date.startDate.AddDays(-dayOfWeek).AddHours(-hours).AddMinutes(-minutes);

            var employeesPerShifts = new List<EmployeesPerShifts>();
            List<ShiftModel> shifts = DB.Shifts
                //.Where(p => p.StartTime >= date.startDate && p.StartTime <= date.startDate.AddDays(7))
                .Where(p => p.StartTime >= date.startDate
                && p.StartTime < date.startDate.AddDays(7))
                .Select(p=> new ShiftModel(p))
                .ToList();

            foreach (var item in shifts)
            {
                var employeesToAdd = DB.Employees
                    .Join(
                        DB.ShiftsEmployees
                            .Where(p => p.ShiftId == item.ShiftId),
                        employee => employee.EmployeeId,
                        shiftEmployee => shiftEmployee.EmployeeId,
                        (employee, shiftEmployee) => employee)
                    .ToList();

                EmployeesPerShifts employeesPerShiftsToAdd = new EmployeesPerShifts
                {
                    Shift = item,
                    Employees = employeesToAdd
                        .Distinct(new EmployeeComparer())
                        .Select(p => new EmployeeModel(p))
                        .ToList()
                };
                employeesPerShifts.Add(employeesPerShiftsToAdd);
            }
            return employeesPerShifts.OrderBy(p=>p.Shift.StartTime).ToList();
        }


        public List<ShiftsEmployeeModel> GetAllEmployeeRequestedAssignsForNextWeek(string employeeId)
        {
            var now = DateTime.Now;
            int dayOfWeek = Convert.ToInt32(now.DayOfWeek);

            List<ShiftsEmployeeModel> shiftsEmployees = DB.ShiftsEmployees
                .Join(
                    DB.Shifts
                        .Where(
                            p => p.StartTime >= DateTime.Now.AddDays(-dayOfWeek + 7)
                            && p.EndTime < DateTime.Now.AddDays(-dayOfWeek + 14)),
                    ShiftsEmployee => ShiftsEmployee.ShiftId,
                    Shift => Shift.ShiftId,
                    (shiftsEmployee, shift) => shiftsEmployee)
                .Where(p => p.EmployeeId == employeeId)
                .Select(p => new ShiftsEmployeeModel(p))
                .ToList();

            return shiftsEmployees;
        }


        public List<ShiftsEmployeeModel> AddEmployeeRequestedAssignsForNextWeek(List<ShiftsEmployeeModel> shiftsEmployeesAssignsToAdd)
        {
            for (int i = 0; i < shiftsEmployeesAssignsToAdd.Count; i++)
            {
                shiftsEmployeesAssignsToAdd[i].State = State.Requested;
            }

            for (int i = 0; i < shiftsEmployeesAssignsToAdd.Count; i++)
            {
                ShiftsEmployeeModel shiftsEmployeeToCheck = new ShiftsEmployeeModel(
                    DB.ShiftsEmployees.FirstOrDefault(
                        p => p.ShiftId == shiftsEmployeesAssignsToAdd[i].ShiftId
                        && p.EmployeeId == shiftsEmployeesAssignsToAdd[i].EmployeeId
                        && p.State == shiftsEmployeesAssignsToAdd[i].State.ToString()));
                if (shiftsEmployeeToCheck == null)
                {
                    ShiftsEmployee shiftsEmployeeToAdd = shiftsEmployeesAssignsToAdd[i].ConvertToShiftEmployee();
                    DB.ShiftsEmployees.Add(shiftsEmployeeToAdd);
                    shiftsEmployeesAssignsToAdd[i].Id = shiftsEmployeeToAdd.Id;
                }
            }
            DB.SaveChanges();

            return shiftsEmployeesAssignsToAdd;
        }


        public void DeleteEmployeeRequestedAssignsForNextWeek(List<int> shiftsEmployeesToDelete)
        {
            foreach (var item in shiftsEmployeesToDelete)
            {
                ShiftsEmployee shiftEmployeeToDelete = DB.ShiftsEmployees.SingleOrDefault(p => p.Id == item);
                if (shiftEmployeeToDelete == null)
                    return;
                DB.ShiftsEmployees.Remove(shiftEmployeeToDelete);
            }
            DB.SaveChanges();
        }

        public List<ShiftsEmployeeModel> UpdateEmployeeRequestedAssignsForNextWeek(ShiftsEmployeesUpdateModel shiftsEmployeesToUpdate)
        {
            for (int i = 0; i < shiftsEmployeesToUpdate.shiftsEmployeesToAdd.Count; i++)
            {
                shiftsEmployeesToUpdate.shiftsEmployeesToAdd[i].State = State.Requested;
            }

            using (DB.Database.BeginTransaction())
            {
                for (int i = 0; i < shiftsEmployeesToUpdate.shiftsEmployeesToAdd.Count; i++)
                {
                    ShiftsEmployee shiftsEmployeeToCheck =
                        DB.ShiftsEmployees.FirstOrDefault(
                            p => p.ShiftId == shiftsEmployeesToUpdate.shiftsEmployeesToAdd[i].ShiftId
                            && p.EmployeeId == shiftsEmployeesToUpdate.shiftsEmployeesToAdd[i].EmployeeId
                            && p.State == shiftsEmployeesToUpdate.shiftsEmployeesToAdd[i].State.ToString());
                    if (shiftsEmployeeToCheck == null)
                    {
                        ShiftsEmployee shiftsEmployeeToAdd = shiftsEmployeesToUpdate.shiftsEmployeesToAdd[i].ConvertToShiftEmployee();
                        DB.ShiftsEmployees.Add(shiftsEmployeeToAdd);
                        shiftsEmployeesToUpdate.shiftsEmployeesToAdd[i].Id = shiftsEmployeeToAdd.Id;
                    }
                }
                DB.SaveChanges();

                foreach (var item in shiftsEmployeesToUpdate.ShiftsEmployeesToDelete)
                {
                    ShiftsEmployee shiftEmployeeToDelete = DB.ShiftsEmployees.SingleOrDefault(p => p.ShiftId == item && p.EmployeeId == shiftsEmployeesToUpdate.EmployeeId);
                    if (shiftEmployeeToDelete == null)
                        continue;
                    DB.ShiftsEmployees.Remove(shiftEmployeeToDelete);
                }
                DB.SaveChanges();

                DB.Database.CommitTransaction();
            }
            return shiftsEmployeesToUpdate.shiftsEmployeesToAdd;
        }


        public List<ShiftModel> GetAllShiftsForNextWeek()
        {
            DateTime now = DateTime.Now;
            int dayOfWeek = Convert.ToInt32(now.DayOfWeek);
            int hours = now.Hour;
            int seconds = now.Second;

            List<Shift> shiftsForNextWeek = DB.Shifts
                .Where(p => p.StartTime >= DateTime.Now.AddDays(-dayOfWeek + 7).AddHours(-hours).AddSeconds(-seconds) 
                && p.StartTime < DateTime.Now.AddDays(-dayOfWeek + 14).AddHours(-hours).AddSeconds(-seconds)).ToList();
            List<ShiftModel> query1 = shiftsForNextWeek
                .Select(p => new ShiftModel(p)).ToList();
            List<ShiftModel> query2 = query1
                .OrderBy(p => p.StartTime).ToList();


            return query2;
        }

        public List<ShiftsEmployeeModel> GetAllEmployeeRequestedShifts(string employeeId)
        {
            return DB.ShiftsEmployees
                .Where(p => p.EmployeeId == employeeId && p.State=="Requested")
                .Select(p => new ShiftsEmployeeModel(p))
                .ToList();
        }

    }
}
