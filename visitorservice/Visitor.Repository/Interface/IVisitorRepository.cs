using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using entity = Visitor.Entity;


namespace Visitor.Repository
{
    public interface IVisitorRepository
    {
       long GetVisitorsCount();
     
       Task<IEnumerable<entity.Visitor>> GetVisitors(entity.Search search);

       Task<entity.Visitor> GetVisitor(string id);

       Task<entity.Visitor> AddVisitor(entity.Visitor visitor);

       Task<entity.Visitor> EditVisitor(entity.Visitor visitor);

       Task<bool> CheckOut(string id);
    }
}