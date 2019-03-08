using visitor.service.helpers;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Microsoft.Extensions.Logging;
using Visitor.Entity;
using Visitor.Repository;
using System.Threading.Tasks;

namespace visitor.service.services
{
    public interface IUserService
    {
        User Authenticate(string userName, string password, out string token);

        Task<bool> ChangePassword(PasswordChange passwordChange);

        Task<bool> ResetPassword(PasswordChange passwordChange);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly IVisitorContext _visitorContext = null;

        private readonly ILogger _logger;

        public UserService(IOptions<AppSettings> appSettings, IVisitorContext context, ILogger<UserService> logger)
        {
            this._appSettings = appSettings.Value;
            this._visitorContext = context;
            this._logger = logger;
        }

        public async Task<bool> ChangePassword(PasswordChange passwordChange)
        {
            var builder = Builders<User>.Filter;
            var filters = builder.Eq(c => c.Id, passwordChange.Id) & builder.Eq(c => c.Password, passwordChange.CurrentPassword); 
            // var filters = builder.Eq(c => c.UserName,"anki");
            var user = await _visitorContext.Users.FindOneAndUpdateAsync(filters, Builders<User>.Update.Set("Password", passwordChange.NewPassword));
            if (user != null)
            {

                _logger.LogInformation(entities.LoggingEvents.ResetPassword, null, "retrieved data:{0}", user);
                return true;
            }
            else
            {
                _logger.LogInformation(entities.LoggingEvents.ResetPassword, null, "could not retrieved data:{0}", user);
                return false;
            }
        }

        public async Task<bool> ResetPassword(PasswordChange passwordChange)
        {
            var builder = Builders<User>.Filter;
            
            // var filters = builder.Eq(c => c.UserName,"anki");
            var user =  await _visitorContext.Users.FindOneAndUpdateAsync( builder.Eq(c => c.Id, passwordChange.Id), Builders<User>.Update.Set("Password","Password"));
            if (user != null)
            {

                _logger.LogInformation(entities.LoggingEvents.ResetPassword, null, "retrieved data:{0}", user);
                return true;
            }
            else
            {
                _logger.LogInformation(entities.LoggingEvents.ResetPassword, null, "could not retrieved data:{0}", user);
                return false;
            }
        }

        public User Authenticate(string userName, string password, out string token)
        {
            var builder = Builders<User>.Filter;
            var filters = builder.Eq(c => c.UserName, userName) & builder.Eq(c => c.Password, password);

            var user = _visitorContext.Users.Find(filters).SingleAsync();
            if (user == null)
            {
                token = null;
                return null;
            }
            else
            {

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var t = tokenHandler.CreateToken(tokenDescriptor);
                token = tokenHandler.WriteToken(t);

                _logger.LogInformation(entities.LoggingEvents.Authenticate, null, "Created Token: {0}", token);

                return user.Result;
            }
        }
    }
}