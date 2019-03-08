using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Visitor.Entity;

namespace Visitor.Repository
{
    public interface IDepartmentRepository
    {
       Task<List<Department>> GetDepartments(Search search);

       Task<List<Department>> GetDepartments();

      // Task<Employee> GetEmployee(string id);

       Task<Department> AddDepartment(Department department);

       Task<Department> EditDepartment(Department department);

       Task<bool> DeleteDepartment(string id);
    }
}