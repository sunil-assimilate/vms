using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Visitor.Entity
{
    public class DropDownValue
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public string Name { get; set; }
    }

    public class StateValue
    {
        public int StateId { get; set; }

        public string Name { get; set; }
    }
}