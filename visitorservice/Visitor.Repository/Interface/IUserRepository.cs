using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Visitor.Entity;

namespace Visitor.Repository
{
    public interface IUserRepository
    {
       Task<List<User>> GetUsers(Search search);

       Task<User> GetUser(string id);

       Task<User> AddUser(User user);

       Task<User> EditUser(User user);

       Task<bool> DeleteUser(string id);
    }
}