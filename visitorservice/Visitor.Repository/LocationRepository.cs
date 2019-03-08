using System.Threading.Tasks;
using Visitor.Entity;
using Visitor.Repository.Interface;

namespace Visitor.Repository
{
    public class LocationRepository : ILocationRepository
    {
        private readonly IVisitorContext _visitorContext;
        public LocationRepository(IVisitorContext visitorContext)
        {
            this._visitorContext = visitorContext;
        }

        public async Task<Location> AddLocation(Location location)
        {
            await this._visitorContext.Locations.InsertOneAsync(location);
            return location;
        }
    }
}