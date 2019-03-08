using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.Extensions.Logging;
using Visitor.Entity;
using Visitor.Repository;

namespace visitor.service.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger _logger;

        public UserController(IUserRepository userRepository, ILogger<UserController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Add([FromBody]User user)
        {
            ISingleModelResponse<User> response = new SingleModelResponse<User>();
            try
            {
                User u = await _userRepository.AddUser(user);
                response.Model = u;
                response.Message = "User added successfully";
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.InsertItem,ex, "Error while adding a new user, Request: {0}", user);
                response.IsError = true;
                response.ErrorMessage = "An Error occured, Please contact to administrator";
                return BadRequest(response);
            }

            return Ok(response);
        }

        // // DELETE api/values/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> Delete(string id)
        // {
        //     ISingleModelResponse<bool> 
        //     bool result = false;

        //     try
        //     {
        //         result = await _userRepository.DeleteUser(id);
        //         if (result)
        //         {
        //             return Ok();
        //         }

        //     }
        //     catch (Exception ex)
        //     {
        //         //TODO: Add Logger later on.
        //         return BadRequest();
        //     }
        // }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            ISingleModelResponse<User> response = new SingleModelResponse<User>();

            try
            {
                User user = await _userRepository.GetUser(id);

                if (user == null)
                {
                    response.Message = "User does not exist";
                    return BadRequest(response);
                }

                response.Model = user;
                response.Message = "User exists in the system";
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.GetItem, ex, "Ërror while getting user for id:{0}", id);
                response.IsError = true;
                response.ErrorMessage = "Some error occured, Please contact to administrator";
            }

            return Ok(response);

        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]User user)
        {
            ISingleModelResponse<User> response = new SingleModelResponse<User>();

            try
            {
                response.Model = await _userRepository.EditUser(user);
                response.Message = "Üser updated successfully";
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.UpdateItem, ex, "Error in User update");
                response.IsError = true;
                response.ErrorMessage = "Some Error occured, Please contact to Administrator";
                return BadRequest(response);
            }

            return Ok(response);
        }


        [HttpPost("search")]
        public async Task<IActionResult> UserDetail([FromBody]Search search)
        {
            //TODO: Handle error in the middleware and add try catch there 
            IListModelResponse<User> response = new ListModelResponse<User>();
            try
            {
                _logger.LogInformation(entities.LoggingEvents.ListItems, "respository: {0}", _userRepository);
                List<User> users = await _userRepository.GetUsers(search);
                response.Model = users;
                response.Message = "Listed users successfully";
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
    }
}
