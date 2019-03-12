using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class State
    {

        [BsonElement("stateId")]
        public int StateId { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("cities")]
        public IList<City> Cities { get; set; }

    }

}
