using Newtonsoft.Json;


namespace visitor.service.entities
{
    public class ApiError
    {
       public ApiError(int statusCode, string statusDescription)
       {
        this.StatusCode = statusCode;
        this.StatusDescription = statusDescription;
       }

       public ApiError(int statusCode, string statusDescription, string message)
       : this(statusCode, statusDescription)
       {
          this.Message = message;
       }

        public int StatusCode { get; private set; }

        public string StatusDescription {get;private set;}

        	[JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Message { get; private set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

}