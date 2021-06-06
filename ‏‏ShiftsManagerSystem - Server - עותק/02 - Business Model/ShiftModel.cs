using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CtrlShift
{
    public class ShiftModel : IComparable<ShiftModel>
    {
        public int ShiftId { get; set; }
        public int ShiftTypeId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NthShift { get; set; }

        public ShiftModel() { }

        public ShiftModel(Shift shift)
        {
            ShiftId = shift.ShiftId;
            ShiftTypeId = shift.ShiftTypeId;
            StartTime = shift.StartTime;
            EndTime = shift.EndTime;
            NthShift = shift.NthShift;
        }

        public Shift ConvertToShift()
        {
            Shift shift = new Shift {
                ShiftId = ShiftId,
                ShiftTypeId = ShiftTypeId,
                StartTime = StartTime,
                EndTime = EndTime,
                NthShift = NthShift,
            };
            return shift;
        }

        public int CompareTo([AllowNull] ShiftModel other)
        {
            throw new NotImplementedException();
        }
    }
}
