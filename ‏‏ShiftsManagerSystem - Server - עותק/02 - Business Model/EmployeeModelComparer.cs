using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CtrlShift
{
    public class EmployeeModelComparer : IEqualityComparer<EmployeeModel>
    {
        public bool Equals([AllowNull] EmployeeModel x, [AllowNull] EmployeeModel y)
        {
            if (Object.ReferenceEquals(x, y)) return true;

            //Check whether any of the compared objects is null.
            if (x is null || y is null)
                return false;

            //Check whether the products' properties are equal.
            return x.EmployeeId == y.EmployeeId;
        }

        public int GetHashCode([DisallowNull] EmployeeModel employeeModel)
        {
            if (employeeModel is null) return 0;

            //Get hash code for the Name field if it is not null.
            int hashEmployeeModelEmployeeId = employeeModel.EmployeeId == null ? 0 : employeeModel.EmployeeId.GetHashCode();

            return hashEmployeeModelEmployeeId;
        }
    }
}

