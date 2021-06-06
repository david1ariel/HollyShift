using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CtrlShift
{
    class Program
    {
        private static readonly TomediaShiftsManagementContext DB = new TomediaShiftsManagementContext();
        private static readonly EmployeesLogic employeesLogic = new EmployeesLogic(DB);
        private static readonly ShiftsLogic shiftsLogic = new ShiftsLogic(DB, employeesLogic);
        private static readonly SettingsLogic settingsLogic = new SettingsLogic(DB);

        static void Main(string[] args)
        {
            try
            {
                CalendarSettingsModel settings = new CalendarSettingsModel();
                settings.CalendarStartDate = DateTime.Now;
                settings.CalendarEndDate = new DateTime(2022, 4, 6);

                //Console.WriteLine("" + settingsLogic.SetShiftsSettingsForBusiness(settings));






                //List<ShiftModel> shifts = DB.Shifts.Select(p => new ShiftModel(p)).ToList();

                //for (int i = 0; i < shifts.Count; i++)
                //{
                //    if(shifts[i].ShiftTypeId%2==1)
                //        DB.Shifts.SingleOrDefault(p=>p.ShiftId==shifts[i].ShiftId).NthShift = 1;
                //}

                //DB.SaveChanges();

                //List<ShiftsEmployeeModel> shifts = DB.ShiftsEmployees.Select(p => new ShiftsEmployeeModel(p)).ToList();

                for (int i = 0; i < DB.ShiftsEmployees.ToList().Count; i++)
                {
                    DB.ShiftsEmployees.ToList()[i].State = State.Set.ToString();
                }
                //for (int i = 0; i < shifts.Count; i++)
                //{
                //    shifts[i].State = State.Set;

                //}
                //foreach (var item in shifts)
                //{
                //    DB.ShiftsEmployees.Add(item.ConvertToShiftEmployee());
                //}


                DB.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
    }
}
