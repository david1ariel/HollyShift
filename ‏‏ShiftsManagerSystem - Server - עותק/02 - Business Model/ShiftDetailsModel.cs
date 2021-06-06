using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlShift
{
    public class ShiftDetailsModel
    {
        public int NthShift { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Type { get; set; }

        public ShiftDetailsModel() { }
    }
}
