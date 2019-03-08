using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.Extensions.Logging;
using Visitor.Repository;
using Visitor.Entity;

namespace visitor.service.Controllers
{
    [Route("configuration")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        public readonly IConfigurationRepository _configurationRepository;
        private readonly ILogger _logger;

        public ConfigurationController(IConfigurationRepository configurationRepository, ILogger<ConfigurationController> logger)
        {
            _configurationRepository = configurationRepository;
            this._logger = logger;
        }

        public async Task<IActionResult> Get()
        {
            //TODO: Handle error in the middleware and add try catch there only
            ISingleModelResponse<Configuration> response = new SingleModelResponse<Configuration>();
            try
            {
                response.Model  = await _configurationRepository.Get();
                response.Message = "Fetched Configuration Successfully";    
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.GetItem, ex, "Error while fetching configuration items");
                response.IsError = true;
                response.ErrorMessage = "Some error occured, Please contact to administration";
                return BadRequest(response);
            }

           return Ok(response);
        }
    }
}