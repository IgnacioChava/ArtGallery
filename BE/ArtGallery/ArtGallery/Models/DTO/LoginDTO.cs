﻿using MongoDB.Bson.Serialization.Attributes;

namespace ArtGallery.Models.DTO
{
    public class LoginDTO
    {


        public string Username { get; set; }

        public string Password { get; set; }

        
    }
}
