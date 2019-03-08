namespace visitor.service
{
    public class SingleModelResponse<T> : ISingleModelResponse<T>
    {
        public SingleModelResponse()
        {


        }
        
        // public SingleModelResponse(string errorMessage)
        // {
        //     this.IsError = true;
        //     this.ErrorMessage = errorMessage;
        // }

        // public SingleModelResponse(string message, T model)
        // {
        //     this.Message = message;
        //     this.Model = model;
        // }

        // public SingleModelResponse(string message, string token, string refreshToken, double expiresAt, T model)
        // {
        //     this.Token = token;
        //     this.RefreshToken = refreshToken;
        //     this.ExpiresAt = expiresAt;
        //     this.Model = model;
        //     this.Message = message;
        // }


        public bool IsError { get; set; }
        public string ErrorMessage { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public double ExpiresAt { get; set; }
        public T Model { get; set; }
    }
}
