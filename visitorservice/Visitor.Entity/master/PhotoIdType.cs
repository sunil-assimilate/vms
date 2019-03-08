using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class PhotoIdType : BaseModel
    {
        [BsonElement("Name")]
        public string Name { get; set; }
    }
}