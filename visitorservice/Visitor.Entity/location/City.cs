using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class City
    {
        [BsonElement("CityId")]
        public int CityId { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }
    }
}