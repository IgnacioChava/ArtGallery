using ArtGallery.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

namespace ArtGallery.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Paint> _paintingsCollection;
        private readonly IMongoCollection<Login> _loginCollection;
        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _paintingsCollection = database.GetCollection<Paint>(mongoDBSettings.Value.CollectionName);
            _loginCollection = database.GetCollection<Login>(mongoDBSettings.Value.CollectionName2);

        }


        public Login CreateUser(Login user)
        {
            
           _loginCollection.InsertOneAsync(user);
            return user;
            
        }
        public async Task<Login> getUserAsync(string username)
        {
            return await _loginCollection.Find(user => user.Username == username).FirstAsync();
        }

        public Paint CreatePaint(Paint paint)
        {
            _paintingsCollection.InsertOneAsync(paint);
            return paint;
           
        }

        public async Task<List<Paint>> GetPaints()
        {
            
            return await _paintingsCollection.Find(paint => true).Limit(25).ToListAsync();
        }

        public async Task<List<Paint>> GetPaintsByName(string name)
        {
            return await _paintingsCollection.Find(paint => paint.Name == name).ToListAsync();
        }

        public async Task<List<Paint>> GetPaintsByDate(string date)
        {
            return await _paintingsCollection.Find(paint => paint.Date == date).ToListAsync();
        }

        public async Task<List<Paint>> GetPaintsByAny(string paintSe)
        {
            int lenghtPaint = paintSe.Length;
            return await _paintingsCollection.Find( paint => paint.Name.Substring(0,lenghtPaint) == paintSe).ToListAsync();
        }

        public async Task<List<Paint>> GetPaintsByLetter(char letter)
        {
            char letterResult = Char.ToUpper(letter);
            List<Paint> paints = await _paintingsCollection.Find(paint => paint.Name.StartsWith(letterResult)).ToListAsync();

            if (!paints.IsNullOrEmpty())
            {
                return paints;
            }
            else
            {
                letterResult = Char.ToLower(letter);
                paints = await _paintingsCollection.Find(paint => paint.Name.StartsWith(letterResult)).ToListAsync();
                if (!paints.IsNullOrEmpty())
                {
                    return paints;
                }
                return paints;
            }
            

        }

        //public async Task UpdateRestaurant(string id, restaurant restaurant )
        //{
        //    await _restaurantsCollection.ReplaceOneAsync(s => s.Id == id, restaurant);
        //    return;
        //} 

    }
}
