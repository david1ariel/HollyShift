using System;
using System.Collections.Generic;

namespace CtrlShift
{
    public partial class Setting
    {
        public int? MinEmployeesInShift { get; set; }
        public int? MaxEmployeesInShift { get; set; }
        public int? MaxHoursPerWeek { get; set; }
        public int? MaxHoursPerMonth { get; set; }
        public int? MinHoursPerWeek { get; set; }
        public int? MinHoursPerMonth { get; set; }
        public bool? CanEmployeesSeeEachOtherSubmitions { get; set; }
        public int Id { get; set; }
    }
}
