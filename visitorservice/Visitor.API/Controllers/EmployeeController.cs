using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Visitor.Entity;
using Visitor.Repository;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.Net.Http.Headers;

namespace visitor.service.Controllers
{
    [Route("employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly ILogger _logger;

        public EmployeeController(IEmployeeRepository employeeRepository, IDepartmentRepository departmentRepository, ILogger<EmployeeController> logger)
        {
            this._employeeRepository = employeeRepository;
            this._departmentRepository = departmentRepository;
            this._logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            ISingleModelResponse<Employee> response = new SingleModelResponse<Employee>();

            try
            {
                Employee employee = await _employeeRepository.GetEmployee(id);

                if (employee == null)
                {
                    response.Message = "Employee does not exist";
                    return BadRequest(response);
                }
                response.Model = employee;
                response.Message = "Employee exists in the system";
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.GetItem, ex, "Error while fetching an employee, id:{0}", id);
                response.IsError = true;
                response.ErrorMessage = "Some error occured, Please contact to administrator";
            }

            return Ok(response);
        }

        [HttpPost("search")]
        public async Task<IActionResult> Get([FromBody]Search search)
        {
            //TODO: Handle error in the middleware and add try catch there 
            IListModelResponse<Employee> response = new ListModelResponse<Employee>();
            try
            {
                _logger.LogInformation(entities.LoggingEvents.ListItems, "respository: {0}", _employeeRepository);
                List<Employee> employees = await _employeeRepository.GetEmployees(search);
                response.Model = employees;
                response.Message = "Listed employees successfully";
            }
            catch (Exception ex)
            {
                _logger.LogInformation(entities.LoggingEvents.ListItems, "Exception:{0}", ex);

                response.IsError = true;
                response.ErrorMessage = "Some Error occured, Please contact to Administrator";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]Employee employee)
        {             
            ISingleModelResponse<Employee> response = new SingleModelResponse<Employee>();
            try
            {                
              bool isresult= await _employeeRepository.isEmpCodeExists(employee.EmpCode);  
              if(isresult)
              {   
                response.IsError = true;                             
                response.Message = "Employee Code is already exist"; 
                return Ok(response);              
              }               
                Employee emp = await _employeeRepository.AddEmployee(employee);
                response.Message = "Employee added successfully";
                response.Model = employee;
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.InsertItem, ex, "Error while adding a new employee, Request: {0}", employee);
                response.IsError = true;
                response.ErrorMessage = "Could not add employee";
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody]Employee employee)
        {
            ISingleModelResponse<Employee> response = new SingleModelResponse<Employee>();

            try
            {
                Employee emp = await _employeeRepository.EditEmployee(employee);
                response.Message = "Employee updated successfully";
                response.Model = employee;
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.UpdateItem, ex, "Error while updating employee");
                response.IsError = true;
                response.ErrorMessage = "Could not update employee";

                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("importemployees"), DisableRequestSizeLimit]
        public async Task<IActionResult> ImportEmployees()
        {
            ISingleModelResponse<dynamic> response = new SingleModelResponse<dynamic>();

            try
            {
                var file = Request.Form.Files[0];
                using (var stream = file.OpenReadStream())
                {
                    using (var reader = new StreamReader(stream))
                    {
                        reader.ReadLine();

                        IList<Employee> employees = new List<Employee>();
                        IList<Department> departments = _departmentRepository.GetDepartments().Result;
                        _logger.LogInformation(entities.LoggingEvents.ImportEmployee, null, "line from Employees: {0}", departments);
                        while (!reader.EndOfStream)
                        {
                            string line = reader.ReadLine();
                            _logger.LogInformation(entities.LoggingEvents.ImportEmployee, null, "lines from Employees: {0}", line);
                            string[] columns = line.Split(",");
                            if (columns.Count() == 5)
                            {

                                Employee employee = new Employee();
                                if (!String.IsNullOrEmpty(columns[0]))
                                {
                                    employee.FirstName = columns[0];
                                }

                                if (!String.IsNullOrEmpty(columns[1]))
                                {
                                    employee.LastName = columns[1];
                                }

                                employee.Cell = columns[2];
                                employee.Email = columns[3];

                                // if (!String.IsNullOrEmpty(columns[4]))
                                // {
                                //     var department = departments.Where(x => x.Code == columns[4]).SingleOrDefault();
                                //     employee.Department = new DropDownValue() { _id = department.Id, Name = department.Name };
                                // }

                                employees.Add(employee);
                            }

                            await _employeeRepository.AddEmployees(employees);

                            response.IsError = false;
                            response.Model = new { TotalCount = employees.Count, SuccessCount = 10 };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.IsError = true;
                response.Message = "Could not import Employees, Please check again";
                return BadRequest("Upload Failed: " + ex.Message);
            }
            return Ok(response);
        }
    }
}