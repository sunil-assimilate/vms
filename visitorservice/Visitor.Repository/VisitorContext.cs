using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Visitor.Entity;
using entity = Visitor.Entity;

namespace Visitor.Repository
{
    public class VisitorContext : IVisitorContext
    {
       private readonly IMongoDatabase _db;

       public VisitorContext(IOptions<Settings> options)
       {
          var client =  new MongoClient(options.Value.ConnectionString);
          _db = client.GetDatabase(options.Value.Database);
       }

       public IMongoCollection<User> Users => _db.GetCollection<User>("Users");

       public IMongoCollection<Role> Roles => _db.GetCollection<Role>("Roles");

       public IMongoCollection<Country> Countries => _db.GetCollection<Country>("Countries");

       public IMongoCollection<PhotoIdType> PhotoIdTypes => _db.GetCollection<PhotoIdType>("PhotoIdTypes");
       
       public IMongoCollection<Department> Departments => _db.GetCollection<Department>("Departments");

       public IMongoCollection<Employee> Employees => _db.GetCollection<Employee>("Employees");

       public IMongoCollection<entity.Visitor> Visitors => _db.GetCollection<entity.Visitor>("Visitors");

       public IMongoCollection<Permission> Permissions => _db.GetCollection<Permission>("Permissions");

       public IMongoCollection<Location> Locations => _db.GetCollection<Location>("Locations");
    }
}