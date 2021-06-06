using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlShift
{
    public class RequestedShiftModel
    {
        public int Id { get; set; }
        public int ShiftId { get; set; }
        public string EmployeeId { get; set; }

        public RequestedShiftModel() { }

        public RequestedShiftModel(RequestedShift requestedShift)
        {
            Id = requestedShift.Id;
            ShiftId = requestedShift.ShiftId;
            EmployeeId = requestedShift.EmployeeId;
        }

        public RequestedShift ConvertToRequestedShift()
        {
            return new RequestedShift
            {
                Id = Id,
                ShiftId = ShiftId,
                EmployeeId = EmployeeId
            };
        }
    }
}
