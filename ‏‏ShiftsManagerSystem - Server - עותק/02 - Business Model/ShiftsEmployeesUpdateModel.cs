using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlShift
{
    public class ShiftsEmployeesUpdateModel
    {
        public string EmployeeId { get; set; }
        public List<ShiftsEmployeeModel> shiftsEmployeesToAdd { get; set; }
        public List<int> ShiftsEmployeesToDelete { get; set; }

        public ShiftsEmployeesUpdateModel() { }
    }
}
