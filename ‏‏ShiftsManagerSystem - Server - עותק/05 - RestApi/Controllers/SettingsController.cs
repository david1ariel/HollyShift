using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CtrlShift.Controllers
{
    //[Authorize(Roles = "admin")]
    //[EnableCors("EntireWorld")]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly SettingsLogic Logic;
        public SettingsController(SettingsLogic logic)
        {
            Logic = logic;
        }

        [HttpPost]
        public IActionResult SetShiftsSettingsForBusiness(SettingModel settingsModel)
        {
            try
            {
                Logic.SetSettings(settingsModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateSettings(SettingModel settingsModel)
        {
            try
            {
                Logic.UpdateSettings(settingsModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetSettings()
        {
            try
            {
                
               return Ok(Logic.GetSettings());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
