using MongoDB.Driver;
using Visitor.Entity;
using entity = Visitor.Entity;

namespace Visitor.Repository
{
    public interface IVisitorContext
    {
        IMongoCollection<User> Users { get; }

        IMongoCollection<Role> Roles { get; }

        IMongoCollection<Country> Countries { get; }

        IMongoCollection<PhotoIdType> PhotoIdTypes { get; }

        IMongoCollection<Department> Departments { get; }

        IMongoCollection<Employee> Employees { get; }

        IMongoCollection<Permission> Permissions { get; }

        IMongoCollection<entity.Visitor> Visitors { get; }

        IMongoCollection<Location> Locations { get; }
    }
}