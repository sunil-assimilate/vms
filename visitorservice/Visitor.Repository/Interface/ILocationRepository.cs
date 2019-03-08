using System.Threading.Tasks;
using Visitor.Entity;

namespace Visitor.Repository.Interface
{
   public interface ILocationRepository
   {
       Task<Location> AddLocation(Location location);
   }
}