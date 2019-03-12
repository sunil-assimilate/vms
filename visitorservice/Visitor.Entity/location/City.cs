using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class City
    {
        [BsonElement("cityId")]
        public int CityId { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }
}