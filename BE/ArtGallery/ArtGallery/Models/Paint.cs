using Microsoft.Extensions.Diagnostics.HealthChecks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace ArtGallery.Models
{
    public class Paint
    {
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("date")]
        public string Date { get; set; }

        [BsonElement("author")]
        public string Author { get; set; }

        [BsonElement("paints")]
        public List<string> ?Paints { get; set; }
    }
}
