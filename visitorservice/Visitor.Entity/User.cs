using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Visitor.Entity
{
    public class User : BaseModel
    {
        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("UserName")]
        public string UserName { get; set; }

        [BsonElement("Password")]
        public string Password { get; set; }

         [BsonElement("ContactNumber")]
        public string ContactNumber { get; set; }

        [BsonElement("Email")]
        public string Email {get;set;}

        [BsonElement("LastLogin")]
        public string LastLogin { get; set; }

        [BsonElement("Role")]
        public DropDownValue Role { get; set; }
    }

    public class UserRole
    {
        [BsonElement("Id")]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

    }
}