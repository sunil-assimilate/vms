using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Visitor.Entity;
using MongoDB.Bson;

namespace Visitor.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly IVisitorContext _visitorContext = null;

        public DepartmentRepository(IVisitorContext visitorContext)
        {
            _visitorContext = visitorContext;
        }

        public async Task<Department> AddDepartment(Department department)
        {
            await _visitorContext.Departments.InsertOneAsync(department);
            return department;
        }

        public async Task<bool> DeleteDepartment(string id)
        {
            await _visitorContext.Departments.DeleteOneAsync(Builders<Department>.Filter.Eq("Id", id));
            return true;
        }

        public async Task<Department> EditDepartment(Department department)
        {
            var result = await _visitorContext.Departments.ReplaceOneAsync(Builders<Department>.Filter.Eq("Id", department.Id), department);
            if (result.MatchedCount == 0)
            {
                // throw the error that employee not found.
            }
            return department;
        }
        // public async Task<Employee> GetEmployee(string id)
        // {
        //     return await _visitorContext.Employees.Find(_=> _.Id == id).SingleAsync();
        // }
        public async Task<List<Department>> GetDepartments(Search search)
        {
            int skip;
            int type;
            string sortBy;

            if (search == null || search.PageNumber == 0 || String.IsNullOrEmpty(search.SortType))
            {
                skip = 0;
                type = 1;
                sortBy = "name";
            }
            else
            {
                skip = search.PageNumber < 2 ? 0: (search.PageNumber -1) * (search.PageSize) ;         
               type = search.SortBy == "ASC" ? 1 : -1;            
                if(string.IsNullOrEmpty(search.SortBy))
               {
                  sortBy = "name";
               }
               else
               {
                  sortBy = search.SortBy;
               }
            }
               var nameFilter = Builders<Department>.Filter.Regex(r => r.Name, "/"+search.Text+"/i");
               var codefilter=Builders<Department>.Filter.Regex(r=>r.Code,"/"+search.Text+"/i");
               return await _visitorContext.Departments.Find(nameFilter| codefilter).Sort(new BsonDocument(sortBy, type)).Skip(skip).Limit(search.PageSize).ToListAsync();
        }

         public async Task<List<Department>> GetDepartments()
         {
           return await _visitorContext.Departments.Find(Builders<Department>.Filter.Empty).ToListAsync();
         }
    }
}