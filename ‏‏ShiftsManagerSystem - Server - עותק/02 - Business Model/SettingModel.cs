using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlShift
{
    public class SettingModel
    {
        public int? MinEmployeesInShift { get; set; }
        public int? MaxEmployeesInShift { get; set; }
        public int? MaxHoursPerWeek { get; set; }
        public int? MaxHoursPerMonth { get; set; }
        public int? MinHoursPerWeek { get; set; }
        public int? MinHoursPerMonth { get; set; }
        public bool? CanEmployeesSeeEachOtherSubmitions { get; set; }
        public bool? IsCalendarSet { get; set; }
        public CalendarSettingsModel CalendarSettingsModel { get; set; }

        public SettingModel() { }

        public SettingModel(Setting setting)
        {
            MinEmployeesInShift = setting.MinEmployeesInShift;
            MaxEmployeesInShift = setting.MaxEmployeesInShift;
            MaxHoursPerWeek = setting.MaxHoursPerWeek;
            MaxHoursPerMonth = setting.MaxHoursPerMonth;
            MinHoursPerWeek = setting.MinHoursPerWeek;
            MinHoursPerMonth = setting.MinHoursPerMonth;
        }

        public Setting ConvertToSetting()
        {
            return new Setting
            {
                MinEmployeesInShift = MinEmployeesInShift,
                MaxEmployeesInShift = MaxEmployeesInShift,
                MaxHoursPerWeek = MaxHoursPerWeek,
                MaxHoursPerMonth = MaxHoursPerMonth,
                MinHoursPerWeek = MinHoursPerWeek,
                MinHoursPerMonth = MinHoursPerMonth,
            };
        }
    }
}
