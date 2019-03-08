using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Visitor.Entity
{
    public class BaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("Id")]
        public string Id { get; set; }

        [BsonElement("CreatedOn")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        [BsonElement("CreatedBy")]
        public string CreatedBy { get; set; }

        [BsonElement("LastModifiedBy")]
        public string LastModifiedBy { get; set; }

        [BsonElement("LastModifiedOn")]
        public DateTime LastModifiedOn { get; set; } = DateTime.Now;
    }

}
