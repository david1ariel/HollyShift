using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CtrlShift
{
    public class ShiftsEmployeeModel 
    {
        public int Id { get; set; }
        public int? ShiftId { get; set; }
        public string EmployeeId { get; set; }
        public State State { get; set; }

        public ShiftsEmployeeModel() { }

        public ShiftsEmployeeModel(ShiftsEmployee shiftsEmployee)
        {
            Id = shiftsEmployee.Id;
            ShiftId = shiftsEmployee.ShiftId;
            EmployeeId = shiftsEmployee.EmployeeId;
            State = (State) Enum.Parse(typeof(State), shiftsEmployee.State);
        }

        public ShiftsEmployee ConvertToShiftEmployee()
        {
            return new ShiftsEmployee
            {
                Id = Id,
                ShiftId = ShiftId,
                EmployeeId = EmployeeId,
                State = State.ToString()
            };
        }

        
    }

    public enum State
    {
        Requested,
        Proposed,
        Set
    }
}
