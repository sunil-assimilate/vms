using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class State
    {

        [BsonElement("StateId")]
        public int StateId { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Cities")]
        public IList<City> Cities { get; set; }

    }

}
