using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver; 
using MongoDB.Bson;
using Microsoft.Extensions.Logging;
using entity = Visitor.Entity;
using Visitor.Entity;

namespace Visitor.Repository
{
    public class VisitorRepository : IVisitorRepository
    {
        private readonly IVisitorContext _visitorContext = null;
       private readonly ILogger _logger = null;
        public VisitorRepository(IVisitorContext context, ILogger<VisitorRepository> logger)
        {
            _visitorContext = context;
            _logger = logger;
        }

        public long GetVisitorsCount()
        {
           return this._visitorContext.Visitors.CountDocuments(new BsonDocument());
        }

        public async Task<IEnumerable<entity.Visitor>> GetVisitors(Search search)
        {
            int skip;
            int type;
            string sortBy;
            
            if(search ==null || search.PageNumber == 0 || String.IsNullOrEmpty(search.SortType))
            {
               skip =0;
               type =1;
               sortBy = "FirstName";
            }
            else 
            {
               skip = search.PageNumber < 2 ? 0: (search.PageNumber -1) * (search.PageSize  ) ;
               type = search.SortBy == "ASC" ? 1 : -1;

               if(string.IsNullOrEmpty(search.SortBy))
               {
                  sortBy = "FirstName";
               }
               else
               {
                  sortBy = search.SortBy;
               }
            }
            _logger.LogInformation(1002, null,"fetched visitors: skip records:{0},number of records: {1}", skip, search.PageSize);
           
           var emailFilter = Builders<entity.Visitor>.Filter.Regex(r => r.Email, "/"+search.Text+"/i");
           var addressFilter = Builders<entity.Visitor>.Filter.Regex(r => r.Address, "/"+search.Text+"/i");
           var contactNumberFilter = Builders<entity.Visitor>.Filter.Regex(r => r.ContactNumber, "/"+search.Text+"/i");
           var nameFilter = Builders<entity.Visitor>.Filter.Regex(r => r.FirstName, "/"+search.Text+"/i");

            return await _visitorContext.Visitors.Find(emailFilter | addressFilter | contactNumberFilter | nameFilter).Sort(new BsonDocument(sortBy,type)).Skip(skip).Limit(search.PageSize).ToListAsync();
        }

        public async Task<entity.Visitor> GetVisitor(string id)
        {
            return await _visitorContext.Visitors.Find(_ => _.Id == id).SingleAsync();
        }

        public async Task<entity.Visitor> AddVisitor(entity.Visitor visitor)
        {
            try
            {
            //   for(int i=0; i<5000; i++)
            //   {
            //       entity.Visitor v1 = new entity.Visitor();
            //       v1.ContactNumber = visitor.ContactNumber;
            //       v1.Country = visitor.Country;
            //       v1.CreatedBy = visitor.CreatedBy;
            //       v1.CreatedOn = visitor.CreatedOn;
            //       v1.Department = visitor.Department;
            //       v1.Email = i+ visitor.Email;
            //       v1.FirstName = visitor.FirstName+i;
            //       v1.IdentityNumber = visitor.IdentityNumber +i;
            //       v1.LastModifiedBy = visitor.LastModifiedBy;
            //       v1.LastModifiedOn = visitor.LastModifiedOn;
            //       v1.LastName = visitor.LastName+i;
            //       v1.Location = visitor.Location;
            //       v1.PhotoIdType = visitor.PhotoIdType;
            //       v1.Purpose = visitor.Purpose+i;
            //       v1.State = visitor.State;
            //       v1.ToMeet = visitor.ToMeet;
            //       v1.ZipCode = visitor.ZipCode+i;

            //       _visitorContext.Visitors.InsertOneAsync(v1);
            //   }


                await _visitorContext.Visitors.InsertOneAsync(visitor);
                return visitor;
            }
            catch (Exception ex)
            {
                //TODO: log the error
                throw ex;
            }
        }

        public async Task<entity.Visitor> EditVisitor(entity.Visitor visitor)
        {
            var result = await _visitorContext.Visitors.ReplaceOneAsync(Builders<entity.Visitor>.Filter.Eq("Id", visitor.Id), visitor);
            if (result.MatchedCount == 0)
            {
                // throw the error that employee not found.
            }

            return visitor;
        }

        public async Task<bool> DeleteVisitor(int id)
        {
            try
            {
                DeleteResult actionResult
                    = await _visitorContext.Visitors.DeleteOneAsync(
                        Builders<entity.Visitor>.Filter.Eq("Id", id));

                return actionResult.IsAcknowledged
                    && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public async Task<bool> CheckOut(string id)
        {
            try
            {
                
                var filter = Builders<entity.Visitor>.Filter.Eq("Id", id);
                var update = Builders<entity.Visitor>.Update.Set("CheckOut", DateTime.Now);

                await _visitorContext.Visitors.FindOneAndUpdateAsync(filter, update);

                return true;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }
    }
}