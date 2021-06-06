using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CtrlShift
{
    public class SettingsLogic : BaseLogic
    {
        public SettingsLogic(TomediaShiftsManagementContext DB) : base(DB) { }

        public void SetSettings(SettingModel settings)
        {
            using (DB.Database.BeginTransaction())
            {
                Setting settingsToAdd = DB.Settings.FirstOrDefault();
                if (settingsToAdd != null)
                    settingsToAdd = settings.ConvertToSetting();
                else
                    DB.Settings.Add(settings.ConvertToSetting());
                DB.SaveChanges();
                List<ShiftModel> shiftsToCreate = new List<ShiftModel>();
                int days = (settings.CalendarSettingsModel.CalendarEndDate - settings.CalendarSettingsModel.CalendarStartDate).Days;
                List<ShiftTypeModel> typesToAdd = new List<ShiftTypeModel>();
                foreach (var item in settings.CalendarSettingsModel.ShiftsDetails)
                {
                    typesToAdd.Add(new ShiftTypeModel { TypeTitle = item.Type });
                }
                foreach (var item in typesToAdd)
                {
                    if (DB.ShiftTypes.SingleOrDefault(p => p.TypeTitle == item.TypeTitle) == null)
                        DB.ShiftTypes.Add(item.ConvertToShiftType());
                }

                DB.SaveChanges();

                for (int i = 0; i < days; i++)
                {
                    foreach (var item in settings.CalendarSettingsModel.ShiftsDetails)
                    {
                        ShiftModel shiftToAdd = new ShiftModel();
                        shiftToAdd.ShiftTypeId = DB.ShiftTypes.FirstOrDefault(p => p.TypeTitle == item.Type).ShiftTypeId;
                        if (item.StartTime.Length > 5)
                            item.StartTime = item.StartTime.Remove(5);
                        if (item.EndTime.Length > 5)
                            item.EndTime = item.EndTime.Remove(5);
                        shiftToAdd.StartTime = settings.CalendarSettingsModel.CalendarStartDate.Date
                            .AddDays(i)
                            .AddHours(Convert.ToInt32(item.StartTime.Remove(2, 3)))
                            .AddMinutes(Convert.ToInt32(item.StartTime.Remove(0, 3)));
                        shiftToAdd.EndTime = settings.CalendarSettingsModel.CalendarStartDate.Date
                            .AddDays(i)
                            .AddHours(Convert.ToInt32(item.EndTime.Remove(2, 3)))
                            .AddMinutes(Convert.ToInt32(item.EndTime.Remove(0, 3)));

                        if (shiftToAdd.EndTime.Ticks < shiftToAdd.StartTime.Ticks)
                            shiftToAdd.EndTime = shiftToAdd.EndTime.AddDays(1);
                        shiftToAdd.NthShift = item.NthShift;
                        if(DB.Shifts.SingleOrDefault(p=>
                        p.StartTime==shiftToAdd.StartTime && 
                        p.EndTime==shiftToAdd.EndTime &&
                        p.NthShift==shiftToAdd.NthShift)==null)
                            shiftsToCreate.Add(shiftToAdd);
                    }
                }
                foreach (var item in shiftsToCreate)
                {
                    DB.Shifts.Add(item.ConvertToShift());
                }
                DB.SaveChanges();
                DB.Database.CommitTransaction();
            }
        }

        public void UpdateSettings(SettingModel settings)
        {
            using (DB.Database.BeginTransaction())
            {
                Setting settingsToAdd = DB.Settings.FirstOrDefault();
                if (settingsToAdd != null)
                    settingsToAdd = settings.ConvertToSetting();
                else
                    DB.Settings.Add(settings.ConvertToSetting());
                DB.SaveChanges();
                ShiftModel firstShift = new ShiftModel(DB.Shifts.SingleOrDefault(p => p.StartTime == DB.Shifts.Min(p => p.StartTime)));
                ShiftModel lastShift = new ShiftModel(DB.Shifts.SingleOrDefault(p => p.EndTime == DB.Shifts.Max(p => p.EndTime)));
                List<ShiftModel> shiftsToCreateBefore = new List<ShiftModel>();
                List<ShiftModel> shiftsToCreateAfter = new List<ShiftModel>();
                int daysBefore = (firstShift.StartTime - settings.CalendarSettingsModel.CalendarStartDate).Days;
                int daysAfter = (settings.CalendarSettingsModel.CalendarEndDate - lastShift.EndTime).Days;


                //to do
                List<ShiftTypeModel> typesToAdd = new List<ShiftTypeModel>();
                foreach (var item in settings.CalendarSettingsModel.ShiftsDetails)
                {
                    typesToAdd.Add(new ShiftTypeModel { TypeTitle = item.Type });
                }
                foreach (var item in typesToAdd)
                {
                    if (DB.ShiftTypes.SingleOrDefault(p => p.TypeTitle == item.TypeTitle) == null)
                        DB.ShiftTypes.Add(item.ConvertToShiftType());
                }

                DB.SaveChanges();

                for (int i = 0; i < daysBefore; i++)
                {
                    foreach (var item in settings.CalendarSettingsModel.ShiftsDetails)
                    {
                        ShiftModel shiftToAdd = new ShiftModel();
                        shiftToAdd.ShiftTypeId = DB.ShiftTypes.FirstOrDefault(p => p.TypeTitle == item.Type).ShiftTypeId;
                        shiftToAdd.StartTime = settings.CalendarSettingsModel.CalendarStartDate.Date
                            .AddDays(i)
                            .AddHours(Convert.ToInt32(item.StartTime.Remove(2, 3)))
                            .AddMinutes(Convert.ToInt32(item.StartTime.Remove(0, 3)));
                        shiftToAdd.EndTime = settings.CalendarSettingsModel.CalendarStartDate.Date
                            .AddDays(i)
                            .AddHours(Convert.ToInt32(item.EndTime.Remove(2, 3)))
                            .AddMinutes(Convert.ToInt32(item.EndTime.Remove(0, 3)));

                        if (shiftToAdd.EndTime.Ticks < shiftToAdd.StartTime.Ticks)
                            shiftToAdd.EndTime = shiftToAdd.EndTime.AddDays(1);
                        shiftToAdd.NthShift = item.NthShift;
                        shiftsToCreateBefore.Add(shiftToAdd);
                    }
                }
                foreach (var item in shiftsToCreateBefore)
                {
                    DB.Shifts.Add(item.ConvertToShift());
                }
                DB.SaveChanges();

                for (int i = 0; i < daysAfter; i++)
                {
                    foreach (var item in settings.CalendarSettingsModel.ShiftsDetails)
                    {
                        ShiftModel shiftToAdd = new ShiftModel();
                        shiftToAdd.ShiftTypeId = DB.ShiftTypes.FirstOrDefault(p => p.TypeTitle == item.Type).ShiftTypeId;
                        shiftToAdd.StartTime = settings.CalendarSettingsModel.CalendarStartDate.Date
                            .AddDays(i)
                            .AddHours(Convert.ToInt32(item.StartTime.Remove(2, 3)))
                            .AddMinutes(Convert.ToInt32(item.StartTime.Remove(0, 3)));
                        shiftToAdd.EndTime = settings.CalendarSettingsModel.CalendarStartDate.Date
                            .AddDays(i)
                            .AddHours(Convert.ToInt32(item.EndTime.Remove(2, 3)))
                            .AddMinutes(Convert.ToInt32(item.EndTime.Remove(0, 3)));

                        if (shiftToAdd.EndTime.Ticks < shiftToAdd.StartTime.Ticks)
                            shiftToAdd.EndTime = shiftToAdd.EndTime.AddDays(1);
                        shiftToAdd.NthShift = item.NthShift;
                        shiftsToCreateAfter.Add(shiftToAdd);
                    }
                }
                foreach (var item in shiftsToCreateAfter)
                {
                    DB.Shifts.Add(item.ConvertToShift());
                }
                DB.SaveChanges();

                DB.Database.CommitTransaction();
            }
        }

        public SettingModel GetSettings()
        {
           
            CalendarSettingsModel calendarSettingsModel = new CalendarSettingsModel
            {
                CalendarStartDate = DB.Shifts.Min(p => p.StartTime),
                CalendarEndDate = DB.Shifts.Max(p => p.EndTime)
            };
            int numOfShifts = DB.Shifts.Max(p => p.NthShift);
            List<ShiftDetailsModel> ShiftsDetails = new List<ShiftDetailsModel>();
            for (int i = 1; i <= numOfShifts; i++)
            {
                var StartTime = DB.Shifts.FirstOrDefault(p => p.NthShift == i).StartTime.ToString();
                StartTime = StartTime.Substring(StartTime.Length - 8);
                var EndTime = DB.Shifts.FirstOrDefault(p => p.NthShift == i).EndTime.ToString().Substring(DB.Shifts.FirstOrDefault(p => p.NthShift == i).EndTime.ToString().Length-8);
                var Type = DB.ShiftTypes
                        .FirstOrDefault(p => p.ShiftTypeId == DB.Shifts
                            .FirstOrDefault(p => p.NthShift == i).ShiftTypeId)
                        .TypeTitle;
                ShiftsDetails.Add(new ShiftDetailsModel
                {
                    StartTime = DB.Shifts.FirstOrDefault(p => p.NthShift == i).StartTime.ToString().Substring(DB.Shifts.FirstOrDefault(p => p.NthShift == i).StartTime.ToString().Length-8),
                    EndTime = DB.Shifts.FirstOrDefault(p => p.NthShift == i).EndTime.ToString().Substring(DB.Shifts.FirstOrDefault(p => p.NthShift == i).EndTime.ToString().Length-8),
                    NthShift = i,
                    Type = DB.ShiftTypes
                        .FirstOrDefault(p => p.ShiftTypeId == DB.Shifts
                            .FirstOrDefault(p => p.NthShift == i).ShiftTypeId)
                        .TypeTitle
                });
                calendarSettingsModel.ShiftsDetails = ShiftsDetails;
            }
            
            SettingModel settingModel = new SettingModel();
            Setting setting = DB.Settings.FirstOrDefault();
            if (setting != null)
            {
                settingModel = new SettingModel(setting);
            }
            
            settingModel.CalendarSettingsModel = calendarSettingsModel;
            settingModel.IsCalendarSet = true;
            if (DB.Shifts.Count()==0)
                settingModel.IsCalendarSet = false;
            return settingModel;
        }
    }
}
