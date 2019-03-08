using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Visitor.Entity
{
    public class Country : BaseModel
    { 
        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("States")]
        public IList<State> States { get; set; }
    }
}