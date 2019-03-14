using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using visitor.service.services;
using Microsoft.AspNetCore.Http;
using System.IO;
using Visitor.Repository;
using entity = Visitor.Entity;
using Visitor.Entity;

namespace visitor.service.Controllers
{
    [Route("visitor")]
    [ApiController]
    public class VisitorController : ControllerBase
    {
        private readonly IVisitorRepository _visitorRepository;
        private readonly IImageService _imageService;
        private readonly ILogger _logger;

        public VisitorController(IVisitorRepository visitorRepository, IImageService imageService, ILogger<VisitorController> logger)
        {
            this._visitorRepository = visitorRepository;
            this._logger = logger;
            this._imageService = imageService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            ISingleModelResponse<entity.Visitor> response = new SingleModelResponse<entity.Visitor>();

            try
            {
                entity.Visitor visitor = await _visitorRepository.GetVisitor(id);

                if (visitor == null)
                {
                    response.Message = "Visitor does not exist";
                    return BadRequest(response);
                }

                response.Model = visitor;
                response.Message = "Visitor exists in the system";
            }
            catch (Exception ex)
            {

                response.IsError = true;
                response.ErrorMessage = "Some error occured, Please contact to administrator";
            }

            return Ok(response);
        }

        [HttpPost("search")]
        public async Task<IActionResult> Get([FromBody]Search search)
        {
            //TODO: Handle error in the middleware and add try catch there 
            IListModelResponse<entity.Visitor> response = new ListModelResponse<entity.Visitor>();

            try
            {
                if (search.TotalCount == 0)
                { 
                    response.TotalCount = _visitorRepository.GetVisitorsCount();
                }

                _logger.LogInformation(entities.LoggingEvents.ListItems, "respository: {0}", search);
                response.Model = await _visitorRepository.GetVisitors(search);
                response.Message = "Listed visitors successfully";
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

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]entity.Visitor visitor)
        {
            ISingleModelResponse<entity.Visitor> response = new SingleModelResponse<entity.Visitor>();

            try
            {
                response.Model = await _visitorRepository.EditVisitor(visitor);
                response.Message = "Updated Information successfully";
            }
            catch (Exception ex)
            {
                _logger.LogInformation(entities.LoggingEvents.UpdateItem, "Exception:{0}", ex);

                response.IsError = true;
                response.ErrorMessage = "Some Error occured, Please contact to Administrator";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]entity.Visitor visitor)
        {
            ISingleModelResponse<entity.Visitor> response = new SingleModelResponse<entity.Visitor>();

            try
            {
                response.Model = await _visitorRepository.AddVisitor(visitor);
                response.Message = "Visitor added successfully";
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.InsertItem, ex, "Error while adding visitor");
                response.IsError = true;
                response.ErrorMessage = "Could not add Visitor";

                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut("checkout/{id}")]
        public async Task<IActionResult> Checkout(string id, [FromBody]Search search)
        {
            IListModelResponse<entity.Visitor> response = new ListModelResponse<entity.Visitor>();

            try
            {
                _logger.LogInformation(entities.LoggingEvents.InsertItem, "Visitor Checkout, id:{0}", id);
                await _visitorRepository.CheckOut(id);
                response.Model = await _visitorRepository.GetVisitors(search);
                response.Message = "Visitor checked out";
            }
            catch (Exception ex)
            {
                _logger.LogInformation(entities.LoggingEvents.InsertItem, "Visitor Checkout, Exception:{0}", ex);
                response.IsError = true;
                response.ErrorMessage = "Could not checkout Visitor";

                return BadRequest(response);
            }

            return Ok(response);
        }


        /// <summary>
        /// Uplaods an image to the server.
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>

        [HttpPost("uploadimage"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadImage([FromQuery]string visitorId, [FromQuery] string type)
        {
            ISingleModelResponse<object> response = new SingleModelResponse<object>();
 
            try
            {
                IFormFile file = Request.Form.Files[0];
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    byte[] bytes = memoryStream.ToArray();
                     _visitorRepository.AddImage(visitorId,type,bytes);
                }
               
                response.Message = "Image uploaded successfully";
            }
            catch (Exception ex)
            {
                _logger.LogError(entities.LoggingEvents.InsertItem, ex, "error while uploading image");
                response.IsError = false;
                response.ErrorMessage = "Could not upload image, Please try again";
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}