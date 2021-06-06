using System;
using System.Collections.Generic;

namespace CtrlShift
{
    public partial class Shift
    {
        public Shift()
        {
            ShiftsEmployees = new HashSet<ShiftsEmployee>();
        }

        public int ShiftId { get; set; }
        public int ShiftTypeId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NthShift { get; set; }
        public string WantedOrUnwanted { get; set; }

        public virtual ShiftType ShiftType { get; set; }
        public virtual ICollection<ShiftsEmployee> ShiftsEmployees { get; set; }
    }
}
