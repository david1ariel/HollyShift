using System;
using System.Collections.Generic;

namespace CtrlShift
{
    public partial class ShiftType
    {
        public ShiftType()
        {
            Shifts = new HashSet<Shift>();
        }

        public int ShiftTypeId { get; set; }
        public string TypeTitle { get; set; }

        public virtual ICollection<Shift> Shifts { get; set; }
    }
}
