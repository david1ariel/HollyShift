using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using MailKit.Net.Smtp;
using MimeKit;
using System.IO;

namespace CtrlShift
{
    public class EmployeesLogic : BaseLogic
    {
        public EmployeesLogic(TomediaShiftsManagementContext DB) : base(DB) { }


        public bool isUsernameExists(string username)
        {
            return DB.Employees.Any(e => e.Username == username);
        }

        public List<EmployeeModel> GetAllEmployees()
        {
            return DB.Employees.Select(e => new EmployeeModel(e)).ToList();
        }

        public EmployeeModel GetSingleEmployee(string id)
        {
            return new EmployeeModel(DB.Employees.SingleOrDefault(e => e.EmployeeId == id));
        }

        public EmployeeModel GetEmployeeByCredentials(CredentialsModel credentialsModel)
        {
            return new EmployeeModel(DB.Employees
                .SingleOrDefault(e => e.Username == credentialsModel.Username && e.Password == credentialsModel.Password));
        }

        public EmployeeModel SetEmployeeLastLoginDate(string employeeId)
        {
            Employee employeeToUpdate = DB.Employees.SingleOrDefault(p => p.EmployeeId == employeeId);
            if (employeeToUpdate == null)
                return null;
            
            
            EmployeeModel employeeModel = new EmployeeModel(employeeToUpdate);
            employeeModel.isLoggedinFirstTime = employeeModel.LastLoginDate == null? true : false;
            employeeToUpdate.LastLoginDate = DateTime.Now;
            DB.SaveChanges();
            return employeeModel;
        }

        public EmployeeModel AddEmployee(EmployeeModel employeeModel)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            employeeModel.Salt = Convert.ToBase64String(salt);
            employeeModel.Password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: employeeModel.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            if (employeeModel.Image != null)
            {
                string extension = Path.GetExtension(employeeModel.Image.FileName);

                employeeModel.ImageFileName = Guid.NewGuid() + extension;

                using (FileStream fileStream = File.Create("Uploads/" + employeeModel.ImageFileName))
                {
                    employeeModel.Image.CopyTo(fileStream);
                }
                employeeModel.Image = null;
            }

            Employee employee = employeeModel.ConvertToEmployee();
            DB.Employees.Add(employee);
            DB.SaveChanges();
            employeeModel.EmployeeId = employee.EmployeeId;
            return employeeModel;
        }

        public EmployeeModel UptdateFullEmployee(EmployeeModel employeeModel)
        {
            Employee employee = DB.Employees.SingleOrDefault(e => e.EmployeeId == employeeModel.EmployeeId);
            if (employee == null)
                return null;
            if (employeeModel.Image != null)
            {
                string extension = Path.GetExtension(employeeModel.Image.FileName);

                employeeModel.ImageFileName = Guid.NewGuid() + extension;

                using (FileStream fileStream = File.Create("Uploads/" + employeeModel.ImageFileName))
                {
                    employeeModel.Image.CopyTo(fileStream);
                }
                employeeModel.Image = null;
            }
            employee.LastName = employeeModel.LastName;
            employee.FirstName = employeeModel.FirstName;
            employee.Title = employeeModel.Title;
            employee.BirthDate = employeeModel.BirthDate;
            employee.HireDate = employeeModel.HireDate;
            employee.Adress = employeeModel.Adress;
            employee.PostalCode = employeeModel.PostalCode;
            employee.Phone1 = employeeModel.Phone1;
            employee.Phone2 = employeeModel.Phone2;
            employee.Notes = employeeModel.Notes;
            employee.ImageFileName = employeeModel.ImageFileName;
            employee.Username = employeeModel.Username;
            employee.Password = employeeModel.Password;
            employee.Role = employeeModel.Role;

            DB.SaveChanges();
            return employeeModel;
        }

        public EmployeeModel UptdatePartialEmployee(EmployeeModel employeeModel)
        {
            if (employeeModel.Image != null)
            {
                string extension = Path.GetExtension(employeeModel.Image.FileName);
                employeeModel.ImageFileName = Guid.NewGuid() + extension;
                using (FileStream fileStream = File.Create("Uploads/" + employeeModel.ImageFileName))
                {
                    employeeModel.Image.CopyTo(fileStream);
                }
                employeeModel.Image = null;
            }

            Employee employee = DB.Employees.SingleOrDefault(p => p.EmployeeId == employeeModel.EmployeeId);
            if (employee == null)
                return null;

            if (employee.LastName != null)
                employee.LastName = employeeModel.LastName;

            if (employee.FirstName != null)
                employee.FirstName = employeeModel.FirstName;

            if (employee.Title != null)
                employee.Title = employeeModel.Title;

            if (employee.BirthDate != null)
                employee.BirthDate = employeeModel.BirthDate;

            if (employee.HireDate != null)
                employee.HireDate = employeeModel.HireDate;

            if (employee.Adress != null)
                employee.Adress = employeeModel.Adress;

            if (employee.PostalCode != null)
                employee.PostalCode = employeeModel.PostalCode;

            if (employee.Phone1 != null)
                employee.Phone1 = employeeModel.Phone1;

            if (employee.Phone2 != null)
                employee.Phone2 = employeeModel.Phone2;

            if (employee.Notes != null)
                employee.Notes = employeeModel.Notes;

            if (employee.ImageFileName != null)
                employee.ImageFileName = employeeModel.ImageFileName;

            if (employee.Username != null)
                employee.Username = employeeModel.Username;

            if (employee.Password != null)
                employee.Password = employeeModel.Password;

            if (employee.Role != null)
                employee.Role = employeeModel.Role;

            DB.SaveChanges();
            return employeeModel;
        }

        public void DeleteEmployee(string id)
        {
            Employee employeeToDelete = DB.Employees.SingleOrDefault(p => p.EmployeeId == id);
            if (employeeToDelete == null)
                return;
            DB.Employees.Remove(employeeToDelete);
            DB.SaveChanges();
        }

        public bool ForgotPassword(string emailToSendVerificationCode)
        {
            Employee employeeToAddVerificationCode = DB.Employees.SingleOrDefault(p => p.Email == emailToSendVerificationCode);
            if (employeeToAddVerificationCode == null)
                return false;

            Random rnd = new Random();
            int randomNumber = rnd.Next(100000, 1000000);
            string verificationCode = Convert.ToString(randomNumber);

            employeeToAddVerificationCode.VerificationCode = verificationCode;
            DB.SaveChanges();

            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress("Shifts Management System",
            "shifts.management.system@gmail.com");
            message.From.Add(from);

            MailboxAddress to = new MailboxAddress(employeeToAddVerificationCode.FirstName + " " + employeeToAddVerificationCode.LastName,
            employeeToAddVerificationCode.Email);
            message.To.Add(to);

            message.Subject = "Verification Code For Shifts Management System";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "<h1>" + verificationCode + "</h1>";
            bodyBuilder.TextBody = verificationCode;

            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient client = new SmtpClient();
            client.CheckCertificateRevocation = false;
            client.Connect("smtp.gmail.com", 465);
            client.Authenticate("shifts.management.system", "87655678");

            client.Send(message);
            client.Disconnect(true);
            client.Dispose();

            return true;
        }

        public bool confirmVerificationCode(string emailToSendVerificationCode, string verificationCode)
        {
            Employee employee = DB.Employees.SingleOrDefault(p => p.Email == emailToSendVerificationCode);
            if (employee == null)
                return false;

            if (employee.VerificationCode == verificationCode)
                return true;

            return false;
        }

        public bool SetNewPassword(string verificationCode, CredentialsModel credentials)
        {
            Employee employee = DB.Employees.SingleOrDefault(p => p.Username == credentials.Username);
            if (employee == null)
                return false;

            if (employee.VerificationCode == verificationCode)
            {
                byte[] salt = new byte[128 / 8];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(salt);
                }
                employee.Salt = Convert.ToBase64String(salt);
                employee.Password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: credentials.Password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8));
                DB.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
