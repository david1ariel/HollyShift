using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CtrlShift
{
    public class EmployeeModel
    {
        public string EmployeeId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? HireDate { get; set; }
        public string Adress { get; set; }
        public string PostalCode { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Notes { get; set; }
        public IFormFile Image { get; set; }
        public string ImageFileName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string VerificationCode { get; set; }
        public string Role { get; set; } = "user";
        public string JwtToken { get; set; }
        public double WorkScheduleGrade { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool isLoggedinFirstTime { get; set; }
        public int? QualityGroup { get; set; }
        public double? WeeklyGrade { get; set; }
        public int? ContractMinShifts { get; set; }
        public int? ContractMaxShifts { get; set; }

        public EmployeeModel() { }

        public EmployeeModel(Employee employee)
        {
            EmployeeId = employee.EmployeeId;
            LastName = employee.LastName;
            FirstName = employee.FirstName;
            Title = employee.Title;
            Email = employee.Email;
            BirthDate = employee.BirthDate;
            HireDate = employee.HireDate;
            Adress = employee.Adress;
            PostalCode = employee.PostalCode;
            Phone1 = employee.Phone1;
            Phone2 = employee.Phone2;
            Notes = employee.Notes;
            ImageFileName = employee.ImageFileName;
            Username = employee.Username;
            Password = employee.Password;
            Salt = employee.Salt;
            VerificationCode = employee.VerificationCode;
            Role = employee.Role;
            LastLoginDate = employee.LastLoginDate;
            QualityGroup = employee.QualityGroup;
            WeeklyGrade = employee.WeeklyGrade;
            ContractMinShifts = employee.ContractMinShifts;
            ContractMaxShifts = employee.ContractMaxShifts;
        }

        public Employee ConvertToEmployee()
        {
            Employee employee = new Employee
            {
                EmployeeId = EmployeeId,
                LastName = LastName,
                FirstName = FirstName,
                Title = Title,
                Email = Email,
                BirthDate = BirthDate,
                HireDate = HireDate,
                Adress = Adress,
                PostalCode = PostalCode,
                Phone1 = Phone1,
                Phone2 = Phone2,
                Notes = Notes,
                ImageFileName = ImageFileName,
                Username = Username,
                Password = Password,
                Salt = Salt,
                VerificationCode = VerificationCode,
                Role = Role,
                LastLoginDate = LastLoginDate,
                QualityGroup = QualityGroup,
                WeeklyGrade = WeeklyGrade,
                ContractMinShifts = ContractMinShifts,
                ContractMaxShifts = ContractMaxShifts,
            };
            return employee;
        }


    }
}
