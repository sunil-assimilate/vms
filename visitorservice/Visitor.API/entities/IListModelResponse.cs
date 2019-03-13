using System.Collections.Generic;
using visitor.service;

public interface IListModelResponse<T> : IResponse<T>
    {
        IEnumerable<T> Model { get; set; }

        long TotalCount {get;set;}
    }
