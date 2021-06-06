using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CtrlShift.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        [HttpGet]
        [Route("{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            try
            {
                // Open a stream to the file: 
                FileStream fileStream = System.IO.File.OpenRead("Uploads/" + fileName);

                // Send back the stream to the client: 
                return File(fileStream, "image/jpeg");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
