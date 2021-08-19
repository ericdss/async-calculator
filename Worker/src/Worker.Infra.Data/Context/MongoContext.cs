using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using Worker.Domain.Entities;
using Worker.Infra.Data.Config;

namespace Worker.Infra.Data.Context
{
    public class MongoContext
    {
        private IMongoDatabase Database { get; set; }
        private MongoClient MongoClient { get; set; }

        // public IMongoCollection<Calculator> Calculator { get; set; }

        public MongoContext(IMongoDbConfig mongoDbConfig)
        {
            MongoClient = new MongoClient(Environment.GetEnvironmentVariable("MONGOCONNECTION") ?? mongoDbConfig.ConnectionString);
            Database = MongoClient.GetDatabase(Environment.GetEnvironmentVariable("DATABASENAME") ?? mongoDbConfig.DatabaseName);

            // Collections
            // Calculator = GetCollection<Calculator>("calculator");
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return Database.GetCollection<T>(collectionName);
        }


    }
}
