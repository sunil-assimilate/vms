using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Visitor.Entity
{
    public class Department :BaseModel
    {
         
        [BsonElement("Name")]
        public string Name { get; set; }
        
        [BsonElement("DepartmentHead")]
        public string DepartmentHead {get;set;}

        [BsonElement("Code")]
        public string Code {get;set;}
    }
}