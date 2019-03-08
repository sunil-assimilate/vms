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
    [Route("role")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        public readonly IRoleRepository _roleRepository;
        private readonly ILogger _logger;

        public RoleController(IRoleRepository roleRepository, ILogger<RoleController> logger)
        {
            this._roleRepository = roleRepository;
            this._logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            ISingleModelResponse<Role> response = new SingleModelResponse<Role>();

            try
            {
                Role Role = await _roleRepository.GetRole(id);

                if (Role == null)
                {
                    response.Message = "Role does not exist";
                    return BadRequest(response);
                }

                response.Model = Role;
                response.Message = "Role exists in the system";
            }
            catch (Exception ex)
            {
                 _logger.LogError(entities.LoggingEvents.GetItem, ex, "Error while fetching role, id: {0}", id);
                response.IsError = true;
                response.ErrorMessage = "Some error occured, Please contact to administrator";
            }

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //TODO: Handle error in the middleware and add try catch there 
            IListModelResponse<Role> response = new ListModelResponse<Role>();
            try
            {
                _logger.LogInformation(entities.LoggingEvents.ListItems, "respository: {0}", _roleRepository);
                List<Role> Roles = await _roleRepository.GetRoles();
                response.Model = Roles;
                response.Message = "Listed Roles successfully";
            }
            catch (Exception ex)
            {
                _logger.LogInformation(entities.LoggingEvents.ListItems, "Exception:{0}", ex);

                response.IsError = true;
                response.ErrorMessage = "Some Error occured, Please contact to Administrator";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]Role role)
        {
            ISingleModelResponse<Role> response = new SingleModelResponse<Role>();

            try
            {
                Role r = await _roleRepository.AddRole(role);
                response.Message = "Role added successfully";
                response.Model = r;
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.InsertItem,ex, "Error while adding a new Role, {0}", role);
                response.IsError = true;
                response.ErrorMessage = "Could not add Role";

                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]Role role)
        {
            ISingleModelResponse<Role> response = new SingleModelResponse<Role>();

            try
            {
                Role r = await _roleRepository.EditRole(role);
                response.Message = "Role updated successfully";
                response.Model = r;
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.UpdateItem, ex, "Error while update Role");
                response.IsError = true;
                response.ErrorMessage = "Could not update Role";

                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}