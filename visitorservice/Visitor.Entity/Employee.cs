using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class Employee : BaseModel
    { 
        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("Cell")]
        public string Cell { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        public DropDownValue Department {get;set;}
    }
}