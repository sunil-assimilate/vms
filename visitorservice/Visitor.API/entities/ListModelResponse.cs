using System.Collections.Generic;

namespace visitor.service
{
public class ListModelResponse<T> : IListModelResponse<T>
    {
        public bool IsError { get; set; }
        public string ErrorMessage { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public double ExpiresAt { get; set; }
        public IEnumerable<T> Model { get; set; } 
}

}

