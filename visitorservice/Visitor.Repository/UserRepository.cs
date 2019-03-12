using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.Extensions.Logging;
using Visitor.Entity;

namespace Visitor.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IVisitorContext _visitorContext = null;
        private readonly ILogger _logger = null;
        public UserRepository(IVisitorContext context, ILogger<UserRepository> logger)
        {
            _visitorContext = context;
            _logger = logger;
        }

        public async Task<List<User>> GetUsers(Search search)
        {
            int skip;
            int type;
            string sortBy;

            if (search == null || search.PageNumber == 0 || String.IsNullOrEmpty(search.SortType))
            {
                skip = 0;
                type = 1;
                sortBy = "FirstName";
            }
            else
            {
                skip = search.PageNumber == 0 ? 0 : search.PageNumber * search.PageSize - 1;
                type = search.SortType == "ASC" ? 1 : -1;
                if (String.IsNullOrEmpty(search.SortBy))
                {
                    sortBy = "FirstName";
                }
                else
                {
                    sortBy = search.SortBy;
                }

            }

            var firstNameFilter = Builders<User>.Filter.Regex(r => r.FirstName, "/" + search.Text + "/i");
            var lastNameFilter = Builders<User>.Filter.Regex(r => r.LastName, "/" + search.Text + "/i");
            var emailFilter = Builders<User>.Filter.Regex(r => r.Email, "/" + search.Text + "/i");
            var contactNumberFilter = Builders<User>.Filter.Regex(r => r.ContactNumber, "/" + search.Text + "/i");

            return await _visitorContext.Users.Find(firstNameFilter | lastNameFilter | emailFilter | contactNumberFilter).Sort(new BsonDocument(sortBy, type)).Skip(skip).Limit(search.PageSize).ToListAsync();
        }

        public async Task<User> GetUser(string id)
        {
            return await _visitorContext.Users.Find(_ => _.Id == id).SingleAsync();
        }

        public async Task<User> AddUser(User user)
        {
            try
            {
                // Set the default password to the user.
                user.Password = "Password";
                // logic for inserting records.
                // for(int i=0;i<5000;i++)
                // {
                //     User u = new User();
                //     u.FirstName=user.FirstName+i;
                //     u.LastName = user.LastName+i;
                //     u.UserName = user.UserName+i;
                //     u.ContactNumber = user.ContactNumber+i;
                //     u.Email = i+user.Email;
                //     _logger.LogInformation(1000, null,"inserting user: {0}",i);
                //    _visitorContext.Users.InsertOneAsync(u);
                // }

                await _visitorContext.Users.InsertOneAsync(user);
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> EditUser(User user)
        {
            user.LastModifiedOn = DateTime.Now;
            user.Password = "Password";
            var result = await _visitorContext.Users.ReplaceOneAsync(Builders<User>.Filter.Eq("Id", user.Id), user);
            if (result.MatchedCount == 0)
            {
                // throw the error that employee not found.
            }

            return user;
        }

        public async Task<bool> DeleteUser(string id)
        {
            try
            {
                DeleteResult actionResult
                    = await _visitorContext.Users.DeleteOneAsync(
                        Builders<User>.Filter.Eq("Id", id));

                return actionResult.IsAcknowledged
                    && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

    }
}