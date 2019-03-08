using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.Extensions.Logging;
using Visitor.Repository;
using Visitor.Entity;

namespace visitor.service.Controllers
{
    [Route("department")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        public readonly IDepartmentRepository _departmentRepository;
        private readonly ILogger _logger;

        public DepartmentController(IDepartmentRepository departmentRepository, ILogger<DepartmentController> logger)
        {
            this._departmentRepository = departmentRepository;
            this._logger = logger;
        }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> Get([FromBody]string id)
        // {
        //     ISingleModelResponse<Department> response = new SingleModelResponse<Department>();

        //     try
        //     {
        //         Depart employee = await _departmentRepository.GetEmployee(id);

        //         if (employee == null)
        //         {
        //             response.Message = "Employee does not exist";
        //             return BadRequest(response);
        //         }

        //         response.Model = employee;
        //         response.Message = "Employee exists in the system";
        //     }
        //     catch (Exception ex)
        //     {

        //         response.IsError = true;
        //         response.ErrorMessage = "Some error occured, Please contact to administrator";
        //     }

        //     return Ok(response);
        // }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //TODO: Handle error in the middleware and add try catch there 
            IListModelResponse<Department> response = new ListModelResponse<Department>();
            try
            {
                _logger.LogInformation(entities.LoggingEvents.ListItems, "respository: {0}", _departmentRepository);
                List<Department> departments = await _departmentRepository.GetDepartments();
                response.Model = departments;
                response.Message = "Listed Departments successfully";
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
        public async Task<IActionResult> Add([FromBody]Department department)
        {
            ISingleModelResponse<Department> response = new SingleModelResponse<Department>();

            try
            {
                Department de = await _departmentRepository.AddDepartment(department);
                response.Message = "Department added successfully";
                response.Model = de;
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.InsertItem, ex, "Error while adding department, Request: {0}", department);
                response.IsError = true;
                response.ErrorMessage = "Could not add department";

                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> update([FromBody]Department department)
        {
            ISingleModelResponse<Department> response = new SingleModelResponse<Department>();

            try
            {
                await _departmentRepository.EditDepartment(department);
                response.Message = "Department updated successfully";
                response.Model = department;
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.UpdateItem, ex, "Error while updating department");
                response.IsError = true;
                response.ErrorMessage = "Could not update department";

                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}