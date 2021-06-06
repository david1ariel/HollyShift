using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CtrlShift
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EntireWorld")]
    //[Authorize(Roles = "manager")]
    //[Authorize(Roles = "admin")]
    public class EmployeesController : ControllerBase, IDisposable
    {
        private readonly EmployeesLogic logic;

        public EmployeesController(EmployeesLogic logic)
        {
            this.logic = logic;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            try
            {
                List<EmployeeModel> employees = logic.GetAllEmployees();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetSingleEmployee(string id)
        {
            try
            {
                EmployeeModel employee = logic.GetSingleEmployee(id);
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AddEmployee(EmployeeModel employeeModel)
        {
            try
            {
                if (logic.isUsernameExists(employeeModel.Username))
                    return BadRequest("Username allready taken");

                EmployeeModel addedEmployee = logic.AddEmployee(employeeModel);
                return Created("api/employees/" + addedEmployee.EmployeeId, addedEmployee);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateFullEmployee(string id, [FromForm] EmployeeModel employeeModel)
        {
            try
            {
                employeeModel.EmployeeId = id;
                EmployeeModel updatedEmployee = logic.UptdateFullEmployee(employeeModel);
                if (updatedEmployee == null)
                    return NotFound($"id {id} not found");
                return Ok(updatedEmployee);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        [Route("{id}")]
        public IActionResult UpdatePartialEmployee(string id, EmployeeModel employeeModel)
        {
            try
            {
                employeeModel.EmployeeId = id;
                EmployeeModel updatedEmployee = logic.UptdatePartialEmployee(employeeModel);
                if (updatedEmployee == null)
                    return NotFound($"id {id} not found");
                return Ok(updatedEmployee);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteEmployee(string id)
        {
            try
            {
                logic.DeleteEmployee(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }






        public void Dispose()
        {
            logic.Dispose();
        }
    }
}
