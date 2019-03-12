using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Visitor.Entity;
using MongoDB.Bson;

namespace Visitor.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IVisitorContext _visitorContext = null;

        public RoleRepository(IVisitorContext context)
        {
            _visitorContext = context;
        }

        public async Task<List<Role>> GetRoles(Search search)
        {            
            int skip;
            int type;
            string sortBy;
            
            if(search == null || search.PageNumber == 0 || String.IsNullOrEmpty(search.SortBy))
            {
               skip =0;
               type =1;
               sortBy = "Name";
            }
            else 
            {
               skip = search.PageNumber == 0 ? 0: search.PageNumber * search.PageSize - 1;
               type = search.SortBy == "ASC" ? 1 : -1;
               sortBy = search.SortBy;
            }
           var rolefilter = Builders<Role>.Filter.Regex(r => r.Name, "/"+search.Text+"/i");   
           return await _visitorContext.Roles.Find(rolefilter).Sort(new BsonDocument(sortBy,type)).Skip(skip).Limit(search.PageSize).ToListAsync();    
        }
        public async Task<Role> GetRole(string id)
        {
            return await _visitorContext.Roles.Find(_ => _.Id == id).SingleAsync();
        }

        public async Task<Role> AddRole(Role role)
        {
            try
            {
                await _visitorContext.Roles.InsertOneAsync(role);
                return role;
            }
            catch (Exception ex)
            {
                //TODO: log the error
                throw ex;
            }
        }

        public async Task<Role> EditRole(Role role)
        {
            var result = await _visitorContext.Roles.ReplaceOneAsync(Builders<Role>.Filter.Eq("Id", role.Id), role);
            if (result.MatchedCount == 0)
            {
                // throw the error that employee not found.
            }

            return role;
        }

        public async Task<bool> DeleteRole(int id)
        {
            try
            {
                DeleteResult actionResult
                    = await _visitorContext.Roles.DeleteOneAsync(
                        Builders<Role>.Filter.Eq("Id", id));

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