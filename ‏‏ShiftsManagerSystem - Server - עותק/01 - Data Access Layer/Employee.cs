using System;
using System.Collections.Generic;

namespace CtrlShift
{
    public partial class Employee
    {
        public Employee()
        {
            ShiftsEmployees = new HashSet<ShiftsEmployee>();
        }

        public string EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? HireDate { get; set; }
        public string Adress { get; set; }
        public string PostalCode { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Notes { get; set; }
        public string ImageFileName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string VerificationCode { get; set; }
        public string Role { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public int? QualityGroup { get; set; }
        public double? WeeklyGrade { get; set; }
        public int? ContractMinShifts { get; set; }
        public int? ContractMaxShifts { get; set; }

        public virtual ICollection<ShiftsEmployee> ShiftsEmployees { get; set; }
    }
}
