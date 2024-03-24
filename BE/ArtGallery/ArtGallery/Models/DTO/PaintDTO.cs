using MongoDB.Bson.Serialization.Attributes;

namespace ArtGallery.Models.DTO
{
    public class PaintDTO
    {
        public string Name { get; set; }

        public string Date { get; set; }
        public string Author { get; set; }
        public List<string>? Paints { get; set; }
    }
}
