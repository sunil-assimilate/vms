using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class Permission
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("Id")]
        public string Id { get; set; }

        [BsonElement("Module")]
        public string Module { get; set; }

        [BsonElement("Controller")]
        public string Controller { get; set; }

        [BsonElement("View")]
        public bool View { get; set; }

        [BsonElement("Add")]
        public bool Add { get; set; }

        [BsonElement("Edit")]
        public bool Edit { get; set; }

        [BsonElement("Delete")]
        public bool Delete { get; set; }

        [BsonElement("Import")]
        public bool Import { get; set; }

        
    }

}