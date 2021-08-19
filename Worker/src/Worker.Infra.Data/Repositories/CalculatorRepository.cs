using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Worker.Domain.Entities;
using Worker.Domain.Interfaces;
using Worker.Infra.Data.Context;

namespace Worker.Infra.Data.Repositories
{
    public class CalculatorRepository : ICalculatorRepository
    {
        private readonly IMongoCollection<Calculator> DbSet;

        public CalculatorRepository(MongoContext context)
        {
            DbSet = context.GetCollection<Calculator>("calculator");
        }

        public async Task<Calculator> GetById(string id)
        {
            return await DbSet.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task Save(string id, Calculator calculator)
        {
            await DbSet.ReplaceOneAsync(c => c.Id == id, calculator);
        }
    }
}
