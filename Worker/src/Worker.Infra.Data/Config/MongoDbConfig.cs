using System;
using System.Collections.Generic;
using System.Text;

namespace Worker.Infra.Data.Config
{
    public class MongoDbConfig : IMongoDbConfig
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
