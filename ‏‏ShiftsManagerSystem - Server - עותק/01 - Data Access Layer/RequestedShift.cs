using System;
using System.Collections.Generic;

namespace CtrlShift
{
    public partial class RequestedShift
    {
        public int Id { get; set; }
        public int ShiftId { get; set; }
        public string EmployeeId { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Shift Shift { get; set; }
    }
}
