using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlShift
{
    public class CalendarSettingsModel
    {
        public DateTime CalendarStartDate { get; set; }
        public DateTime CalendarEndDate { get; set; }
        public List<ShiftDetailsModel> ShiftsDetails { get; set; }

        public CalendarSettingsModel() { }


    }
}
