using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace CtrlShift
{
    public class DataHandler
    {
        private static readonly TomediaShiftsManagementContext DB = new TomediaShiftsManagementContext();
        private static readonly EmployeesLogic employeesLogic = new EmployeesLogic(DB);
        private static readonly ShiftsLogic shiftsLogic = new ShiftsLogic(DB,employeesLogic);

        

        

        public List<EmployeesPerShifts> GetProposedEmployeesPerShiftsOfWeek(DateModel date)
        {
            List<EmployeesPerShifts> employeesPerShifts = new List<EmployeesPerShifts>();
            

            
            
            
            
            
            
            
            
            
            
            
            //return employeesPerShifts;
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            return shiftsLogic.GetAllEmployeesPerShiftsOfWeek(date);
        }

        public EmployeeModel SetEmployeeWorkScheduleGrade(EmployeeModel employee)
        {



            return employee;
        }

        
    }
}
