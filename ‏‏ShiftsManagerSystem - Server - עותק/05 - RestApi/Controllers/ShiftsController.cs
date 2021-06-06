using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CtrlShift.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EntireWorld")]
    public class ShiftsController : ControllerBase
    {
        private readonly ShiftsLogic logic;
        private readonly DataHandler dataHandler;

        public ShiftsController(ShiftsLogic logic, DataHandler dataHandler)
        {
            this.logic = logic;
            this.dataHandler = dataHandler;
        }

        [HttpGet]
        [Route("past_shifts")]
        public IActionResult GetAllPastShifts()
        {
            try
            {
                List<ShiftModel> pastShifts = logic.GetAllShifts();
                return Ok(pastShifts);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("shifts_for_ui")]
        public IActionResult GetAllEmployeesPerShifts()
        {
            try
            {
                List<EmployeesPerShifts> shiftForUI = logic.GetAllEmployeesPerShifts();
                
                return Ok(shiftForUI);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        
        [HttpGet]
        [Route("past_shifts/{id}")]
        public IActionResult GetSinglePastShift(int id)
        {
            try
            {
                ShiftModel pastShift = logic.GetSingleShift(id);
                if (pastShift == null)
                    return NotFound($"id {id} not found");
                return Ok(pastShift);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("past_shifts")]
        public IActionResult AddPastShift(ShiftModel pastShiftModel)
        {
            try
            {
                ShiftModel addedPastShift = logic.AddShiftModel(pastShiftModel);
                return Created("api/shifts/past_shifts/" + addedPastShift.ShiftId, addedPastShift);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("past_shifts/{id}")]
        public IActionResult UpdateFullPastShift(int id, ShiftModel pastShiftModel)
        {
            try
            {
                pastShiftModel.ShiftId = id;
                ShiftModel updatedPastShift = logic.UptdateFullShift(pastShiftModel);
                if (updatedPastShift == null)
                    return NotFound($"id {id} not found");
                return Ok(updatedPastShift);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        [Route("past_shifts/{id}")]
        public IActionResult UpdatePartialPastShift(int id, ShiftModel pastShiftModel)
        {
            try
            {
                pastShiftModel.ShiftId = id;
                ShiftModel updatedPastShift = logic.UptdatePartialShift(pastShiftModel);
                if (updatedPastShift == null)
                    return NotFound($"id {id} not found");
                return Ok(updatedPastShift);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("past_shifts/{id}")]
        public IActionResult DeletePastShift(int id)
        {
            try
            {
                logic.DeleteShift(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }




        


        [HttpGet]
        [Route("shift_types")]
        public IActionResult GetAllShiftTypes()
        {
            try
            {
                List<ShiftTypeModel> shiftTypes = logic.GetAllShiftTypes();
                return Ok(shiftTypes);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("shift_types/{id}")]
        public IActionResult GetOneShiftType(int id)
        {
            try
            {
                ShiftTypeModel shiftType = logic.GetSingleShiftType(id);
                if (shiftType == null)
                    return NotFound($"id {id} not found");
                return Ok(shiftType);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("shift_types")]
        public IActionResult AddShiftType(ShiftTypeModel shiftTypeModel)
        {
            try
            {
                ShiftTypeModel addedShiftType = logic.AddShiftTypeModel(shiftTypeModel);
                return Created("api/shifts/shift_types/" + addedShiftType.ShiftTypeId, addedShiftType);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("shift_types/{id}")]
        public IActionResult UpdateFullShiftType(int id, ShiftTypeModel shiftTypeModel)
        {
            try
            {
                shiftTypeModel.ShiftTypeId = id;
                ShiftTypeModel updatedShiftType = logic.UptdateFullShiftType(shiftTypeModel);
                if (updatedShiftType == null)
                    return NotFound($"id {id} not found");
                return Ok(updatedShiftType);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        [Route("shift_types/{id}")]
        public IActionResult UpdatePartialShiftType(int id, ShiftTypeModel shiftTypeModel)
        {
            try
            {
                shiftTypeModel.ShiftTypeId = id;
                ShiftTypeModel updatedShiftType = logic.UptdatePartialShiftType(shiftTypeModel);
                if (updatedShiftType == null)
                    return NotFound($"id {id} not found");
                return Ok(updatedShiftType);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("shift_types/{id}")]
        public IActionResult DeleteShiftType(int id)
        {
            try
            {
                logic.DeleteShiftType(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //---------------------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------------


        [HttpGet]
        [Route("get-all-employee-requested-assigns-for-next-week/{employeeId}")]
        public IActionResult addEmployeeRequestedAssignsForNextWeek(string employeeId)
        {
            try
            {
                var employeeRequestedAssignsForNextWeek = logic.GetAllEmployeeRequestedAssignsForNextWeek(employeeId);
                return Ok(employeeRequestedAssignsForNextWeek);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("add-employee-requested-assigns-for-next-week")]
        public IActionResult AddEmployeeRequestedAssignsForNextWeek(List<ShiftsEmployeeModel> shiftsEmployeesAssignsToAdd)
        {
            try
            {
                var addedShiftsEmployeesAssigns = logic.AddEmployeeRequestedAssignsForNextWeek(shiftsEmployeesAssignsToAdd);
                return Ok(addedShiftsEmployeesAssigns);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("delete-employee-requested-assigns-for-next-week")]
        public IActionResult DeleteEmployeeRequestedAssignsForNextWeek(List<int> shiftsEmployeesAssignsToDelete)
        {
            try
            {
                logic.DeleteEmployeeRequestedAssignsForNextWeek(shiftsEmployeesAssignsToDelete);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("update-employee-requested-assigns-for-next-week")]
        public IActionResult UpdateEmployeeRequestedAssignsForNextWeek(ShiftsEmployeesUpdateModel shiftsEmployeesToUpdate)
        {
            try
            {
                var addedShiftsEmployeesAssigns = logic.UpdateEmployeeRequestedAssignsForNextWeek(shiftsEmployeesToUpdate);
                return Ok(addedShiftsEmployeesAssigns);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("employees-per-shifts")]
        public IActionResult GetAllEmployeesPerShiftsOfWeek(DateModel date)
        {
            try
            {
                List<EmployeesPerShifts> employeesPerShiftsOfWeek = logic.GetAllEmployeesPerShiftsOfWeek(date);

                return Ok(employeesPerShiftsOfWeek);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("proposed-employees-per-shifts")]
        public IActionResult GetProposedEmployeesPerShiftsOfWeek(DateModel date)
        {
            try
            {
                List<EmployeesPerShifts> proposedEmployeesPerShiftsOfWeek = dataHandler.GetProposedEmployeesPerShiftsOfWeek(date);

                return Ok(proposedEmployeesPerShiftsOfWeek);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("shifts-for-next-week")]
        public IActionResult getAllShiftsForNextWeek()
        {
            try
            {
                var shiftsForNextWeek = logic.GetAllShiftsForNextWeek();
                return Ok(shiftsForNextWeek);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("get-all-employee-requested-shifts/{employeeId}")]
        public IActionResult GetAllEmployeeRequestedShifts(string employeeId)
        {
            try
            {
                var employeeRequestedShifts = logic.GetAllEmployeeRequestedShifts(employeeId);
                return Ok(employeeRequestedShifts);
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
