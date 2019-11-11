using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Trips.Controllers
{
    [Route("api/Marker/")]
    [ApiController]
    public class MarkerController : Controller
    {
        [HttpGet]
        [Route("GetAllMarkers")]
        public ActionResult<IEnumerable<object>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        [Route("AddMarker")]
        public void Post([FromBody] object marker)
        {
        }

    }
}
