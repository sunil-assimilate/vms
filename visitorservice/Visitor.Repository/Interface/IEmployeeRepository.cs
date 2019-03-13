using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Visitor.Entity;

namespace Visitor.Repository
{
    public interface IEmployeeRepository
    {
       Task<List<Employee>> GetEmployees(Search search);

       Task<Employee> GetEmployee(string id);

       Task<Employee> AddEmployee(Employee employee);

       Task AddEmployees(IList<Employee> employees);

       Task<Employee> EditEmployee(Employee emp);

       Task<bool> DeleteEmployee(string id);

       Task<bool> isEmpCodeExists(string empCode);
    }
}