namespace ArtGallery.Models
{
    public class MongoDBSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CollectionName { get; set; } = null!;

        public string CollectionName2 { get; set; } = null!;
    }
}
