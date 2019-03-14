using Microsoft.AspNetCore.Mvc;
using visitor.service.services;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Visitor.Entity;

namespace visitor.service
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IUserService _userService;
        private readonly ILogger _logger;

        public AccountController(IUserService userService, ILogger<AccountController> logger)
        {
            this._userService = userService;
            this._logger = logger;
        }

        [Route("Authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody]User userParam)
        {
            ISingleModelResponse<User> response = new SingleModelResponse<User>();
            string token;
            try
            {

             //Log username and password   
            _logger.LogInformation(entities.LoggingEvents.GetItem, null, "Authenticate: UserName - {0} , Password {1}", userParam.UserName, userParam.Password);
            var user =  _userService.Authenticate(userParam.UserName, userParam.Password, out token);
            if (user == null)
            {
                response.IsError = true;
                response.Message = "Invalid Username or Password";
            }
            response.Model = user;
            response.Token = token;
            return Ok(response);
            }
            catch
            {
                response.IsError=true;
                response.ErrorMessage="An error occurred. Please try again";
                return BadRequest(response);
            }
        }


        [Route("changepassword")]
        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody]PasswordChange passwordReset)
        {
            ISingleModelResponse<PasswordChange> response = new SingleModelResponse<PasswordChange>();
            _logger.LogInformation(entities.LoggingEvents.GetItem, null, "ResetPassword: id - {0} , Password {1}", passwordReset.Id, passwordReset.CurrentPassword);

            bool result = await _userService.ChangePassword(passwordReset);

            if (!result)
            {
                response.IsError = true;
                response.Message = "Could not update password";
                //return BadRequest(response);
            }


            response.Model = passwordReset;

            return Ok(response);

        }

        [Route("resetpassword")]
        [HttpPost]
        public async Task<IActionResult> ResetPassword([FromBody]PasswordChange passwordReset)
        {
            ISingleModelResponse<PasswordChange> response = new SingleModelResponse<PasswordChange>();
            _logger.LogInformation(entities.LoggingEvents.GetItem, null, "ResetPassword: id - {0} ", passwordReset.Id);

            bool result = await _userService.ResetPassword(passwordReset);

            if (!result)
            {
                response.IsError = true;
                response.Message = "Could not reset password";
               // return BadRequest(response);
            }

            response.Model = passwordReset;

            return Ok(response);

        }
    }
}