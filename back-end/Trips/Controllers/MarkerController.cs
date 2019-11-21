using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Trips.Domain.Dtos;
using Trips.Domain.Interfaces;

namespace Trips.Api
{
    [Route("api/Marker/")]
    [ApiController]
    public class MarkerController : Controller
    {
        private IMarkerService _markerService;
        public MarkerController(IMarkerService markerService)
        {
            _markerService = markerService;
        }

        [HttpGet]
        [Route("GetAllMarkers")]
        public ActionResult<IEnumerable<MarkerDto>> Get()
        {
            return new List<MarkerDto>();
        }

        [HttpPost]
        [Route("AddMarker")]
        public async Task<bool> Post([FromBody] MarkerDto marker)
        {
            return await _markerService.AddMarker(marker);
        }

    }
}
