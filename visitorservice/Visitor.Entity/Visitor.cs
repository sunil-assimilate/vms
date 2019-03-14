using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic; 

namespace Visitor.Entity
{
    public class Visitor : BaseModel
    {

        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("ContactNumber")]
        public string ContactNumber { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Country")]
        public DropDownValue Country { get; set; }

        [BsonElement("ProfilePicture")]
        public  byte[] Image {get;set;}

        [BsonElement("PhotoIdentity")]
        public  byte[] PhotoIdentity {get;set;}

        [BsonElement("Signature")]
        public byte[] Signature {get;set;}

        [BsonElement("State")]
        public StateValue State { get; set; }

        [BsonElement("Department")]
        public DropDownValue Department { get; set; }

        [BsonElement("Address")]
        public string Address { get; set; }

        [BsonElement("ImagePath")]
        public string ImagePath { get; set; }

        [BsonElement("PhotoIdPath")]
        public string PhotoIdPath { get; set; }

        [BsonElement("Location")]
        public DropDownValue Location {get;set;}

        [BsonElement("Purpose")]
        public string Purpose { get; set; }

        
        [BsonElement("PhotoIdType")]
        public DropDownValue PhotoIdType { get; set; }


        [BsonElement("IdentityNumber")]
        public string IdentityNumber { get; set; }

        [BsonElement("ToMeet")]
        public DropDownValue ToMeet { get; set; }


        [BsonElement("Comment")]
        public string Comment { get; set; }

        
        [BsonElement("ZipCode")]
        public string ZipCode { get; set; }

        [BsonElement("CheckIn")]
        public DateTime CheckIn { get; set; } = DateTime.Now;

        [BsonElement("CheckOut")]
        public DateTime CheckOut { get; set; }
    }
}