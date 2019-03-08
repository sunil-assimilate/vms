using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Visitor.Entity;
using MongoDB.Bson;

namespace Visitor.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IVisitorContext _visitorContext = null;

        public EmployeeRepository(IVisitorContext visitorContext)
        {
            _visitorContext = visitorContext;
        }

        public async Task<Employee> AddEmployee(Employee employee)
        {
           await _visitorContext.Employees.InsertOneAsync(employee);
           return employee;
        }

        public async Task AddEmployees(IList<Employee> employees)
        {
           await _visitorContext.Employees.InsertManyAsync(employees);
        }
        
        public async Task<bool> DeleteEmployee(string id)
        {
            await _visitorContext.Employees.DeleteOneAsync(Builders<Employee>.Filter.Eq("Id", id));
            return true;
        }

        public async Task<Employee> EditEmployee(Employee emp)
        {
          var result =  await _visitorContext.Employees.ReplaceOneAsync(Builders<Employee>.Filter.Eq("Id", emp.Id), emp);
          if (result.MatchedCount ==0)
          {
             // throw the error that employee not found.
          }

          return emp;
        }

        public async Task<Employee> GetEmployee(string id)
        {
            return await _visitorContext.Employees.Find(_=> _.Id == id).SingleAsync();
        }

        public async Task<List<Employee>> GetEmployees(Search search)
        {
            int skip;
            int type;
            string sortBy;
            
            if(search == null || search.PageNumber == 0 || String.IsNullOrEmpty(search.SortBy))
            {
               skip =0;
               type =1;
               sortBy = "FirstName";
            }
            else 
            {
               skip = search.PageNumber == 0 ? 0: search.PageNumber * search.PageSize - 1;
               type = search.SortBy == "ASC" ? 1 : -1;
               sortBy = search.SortBy;
            }

           var firstNameFilter = Builders<Employee>.Filter.Regex(r => r.FirstName, "/"+search.Text+"/i");
           var lastNameFilter = Builders<Employee>.Filter.Regex(r => r.LastName, "/"+search.Text+"/i");
           var emailFilter = Builders<Employee>.Filter.Regex(r => r.Email, "/"+search.Text+"/i");
 
           return await _visitorContext.Employees.Find(firstNameFilter | lastNameFilter | emailFilter).Sort(new BsonDocument(sortBy,type)).Skip(skip).Limit(search.PageSize).ToListAsync();    
        }
    }
}