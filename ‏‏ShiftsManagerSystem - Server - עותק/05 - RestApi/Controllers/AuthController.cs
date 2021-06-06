using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CtrlShift
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EntireWorld")]
    public class AuthController : ControllerBase
    {
        private readonly JwtHelper jwtHelper;
        private readonly EmployeesLogic employeesLogic;

        public AuthController(JwtHelper jwtHelper, EmployeesLogic employeesLogic)
        {
            this.jwtHelper = jwtHelper;
            this.employeesLogic = employeesLogic;
        }


        [HttpPost]
        [Route("register")]
        public IActionResult Register(EmployeeModel employeeModel)
        {
            if (employeesLogic.isUsernameExists(employeeModel.Username))
                return BadRequest("Username already taken");

            employeesLogic.AddEmployee(employeeModel);

            employeeModel.JwtToken = jwtHelper.GetJwtToken(employeeModel.Username, employeeModel.Role);

            return Created("api/employees/" + employeeModel.EmployeeId, employeeModel);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(CredentialsModel credentialsModel)
        {
            EmployeeModel employeeModel = employeesLogic.GetEmployeeByCredentials(credentialsModel);
            if (employeeModel == null)
                return Unauthorized("Incorrect username or password");

            employeeModel = employeesLogic.SetEmployeeLastLoginDate(employeeModel.EmployeeId);

            employeeModel.JwtToken = jwtHelper.GetJwtToken(employeeModel.Username, employeeModel.Password);
            return Ok(employeeModel);

        }

        [HttpGet]
        [Route("forgot-password/{emailToSendVerificationCode}")]
        public IActionResult ForgotPassword(string emailToSendVerificationCode)
        {
            try
            {
                bool success = employeesLogic.ForgotPassword(emailToSendVerificationCode);

                if(success)
                    return Ok();

                return BadRequest("Email not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("confirm-verification-code/{emailToSendVerificationCode}/{verificationCode}")]
        public IActionResult ConfirmVerificationCode(string emailToSendVerificationCode, string verificationCode)
        {
            try
            {
                if(employeesLogic.confirmVerificationCode(emailToSendVerificationCode, verificationCode))
                    return Ok();
                return BadRequest("The verification code you've entered does not match!");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        [Route("set-new-password/{verificationCode}")]
        public IActionResult SetNewPassword(string verificationCode, CredentialsModel credentials)
        {
            try
            {
                if (employeesLogic.SetNewPassword(verificationCode, credentials))
                    return Ok();
                return BadRequest("The verification code you've entered does not match!");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
