using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Visitor.Entity;

namespace Visitor.Repository
{
    public class ConfigurationRepository : IConfigurationRepository
    {
        private readonly IVisitorContext _visitorContext = null;

        public ConfigurationRepository(IVisitorContext visitorContext)
        {
            _visitorContext = visitorContext;
        }

        public async Task<Configuration> Get()
        {
            var countries =  _visitorContext.Countries.Find(Builders<Country>.Filter.Empty).Project<Country>("{ CreatedOn:0, CreatedBy:0, LastModifiedBy:0,LastModifiedOn:0 }").ToListAsync();
     
            var photoIdTypes =   _visitorContext.PhotoIdTypes.Find(Builders<PhotoIdType>.Filter.Empty).Project<DropDownValue>("{_id:1,Name:1}").ToListAsync();
            var departments =   _visitorContext.Departments.Find(Builders<Department>.Filter.Empty).Project<DropDownValue>("{_id:1,Name:1}").ToListAsync();
            var roles =   _visitorContext.Roles.Find(Builders<Role>.Filter.Empty).Project<DropDownValue>("{_id:1,Name:1}").ToListAsync();
            var locations = _visitorContext.Locations.Find(Builders<Location>.Filter.Empty).Project<DropDownValue>("{_id:1,Name:1}").ToListAsync();
            var employees =  _visitorContext.Employees.Find(Builders<Employee>.Filter.Empty).ToListAsync();
     
            await Task.WhenAll(countries, photoIdTypes,departments, employees, locations);
            Configuration configuration = new Configuration();
            configuration.Countries = countries.Result;
            configuration.Roles = roles.Result;
            configuration.Departments = departments.Result;
            configuration.Employees = employees.Result;
            configuration.PhotoIdTypes = photoIdTypes.Result;
            configuration.Locations = locations.Result;
          //  configuration.Permissions = permissions.Result;

            return configuration;
        }
    }
}