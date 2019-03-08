using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks; 
using Visitor.Entity;

namespace Visitor.Repository
{
    public interface IConfigurationRepository
    {
      Task<Configuration> Get();
    }
}