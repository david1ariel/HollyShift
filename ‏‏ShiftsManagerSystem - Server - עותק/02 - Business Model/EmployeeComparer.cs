using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CtrlShift
{
    public class EmployeeComparer : IEqualityComparer<Employee>
    {
        public bool Equals([AllowNull] Employee x, [AllowNull] Employee y)
        {
            if (Object.ReferenceEquals(x, y)) return true;

            //Check whether any of the compared objects is null.
            if (x is null || y is null)
                return false;

            //Check whether the products' properties are equal.
            return x.EmployeeId == y.EmployeeId;
        }

        public int GetHashCode([DisallowNull] Employee employee)
        {
            if (employee is null) return 0;

            //Get hash code for the Name field if it is not null.
            int hashEmployeeEmployeeId = employee.EmployeeId == null ? 0 : employee.EmployeeId.GetHashCode();

            return hashEmployeeEmployeeId;
        }
    }
}

