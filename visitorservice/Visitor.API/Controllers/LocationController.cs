using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.Extensions.Logging;
using Visitor.Repository.Interface;
using Visitor.Repository;
using Visitor.Entity;

namespace visitor.service.Controllers
{
    [Route("location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        public readonly ILocationRepository _locationRepository;
        private readonly ILogger _logger;

        public LocationController(ILocationRepository locationRepository, ILogger<ConfigurationController> logger)
        {
            _locationRepository = locationRepository;
            this._logger = logger;
        }

        public async Task<IActionResult> Add([FromBody]Location location)
        {
            //TODO: Handle error in the middleware and add try catch there only
            ISingleModelResponse<Location> response = new SingleModelResponse<Location>();
            try
            {
                response.Model  = await _locationRepository.AddLocation(location);
                response.Message = "Location is added Successfully";    
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.InsertItem, ex, "Error while adding a new location");
                response.IsError = true;
                response.ErrorMessage = "Some error occured, Please contact to administration";
                return BadRequest(response);
            }

           return Ok(response);
        }
    }
}