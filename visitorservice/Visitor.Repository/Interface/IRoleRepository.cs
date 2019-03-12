using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Visitor.Entity;

namespace Visitor.Repository
{
    public interface IRoleRepository
    {
       Task<List<Role>> GetRoles(Search search);

       Task<Role> GetRole(string id);

       Task<Role> AddRole(Role role);

       Task<Role> EditRole(Role role);

       Task<bool> DeleteRole(int id);
    }
}