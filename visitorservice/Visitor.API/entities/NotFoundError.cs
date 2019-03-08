using System.Net;
namespace visitor.service.entities
{
    public class NotFoundError : ApiError
    {
        public NotFoundError()
        : base(404, HttpStatusCode.NotFound.ToString())
        {
        }
        public NotFoundError(string message)
        : base(404, HttpStatusCode.NotFound.ToString(), message)
        {
        }
    }
}