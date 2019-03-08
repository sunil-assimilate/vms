using System.Collections.Generic;

namespace visitor.service
{
    public interface IResponse<T>
    {
        bool IsError { get; set; } 

        string Message { get; set; }

        string ErrorMessage { get; set; }

        string Token { get; set; }
        string RefreshToken { get; set; }
        double ExpiresAt { get; set; }

    }
}