using System.Collections.Generic;

namespace Visitor.Entity
{
    public class Search
    {
        public string SortType { get; set; }

        public string SortBy { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public string Text { get; set; }
    }

}