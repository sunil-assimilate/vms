using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Visitor.Entity;
using entity = Visitor.Entity;

namespace Visitor.Repository
{
    public interface IVisitorRepository
    {
       Task<IEnumerable<entity.Visitor>> GetVisitors(Search search);

       Task<entity.Visitor> GetVisitor(string id);

       Task<entity.Visitor> AddVisitor(entity.Visitor visitor);

       Task<entity.Visitor> EditVisitor(entity.Visitor visitor);

       Task<bool> CheckOut(string id);
    }
}