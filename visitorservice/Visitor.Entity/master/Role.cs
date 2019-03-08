using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class Role : BaseModel
    {        
        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Type")]
        public string Type { get; set; }

        [BsonElement("Permissions")]
        public IList<RolePermission> Permissions {get;set;}

    }
}