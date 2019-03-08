

using visitor.service;

public interface ISingleModelResponse<T> : IResponse<T>
{
        T Model { get; set; }
}