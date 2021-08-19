using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Worker.Domain.Entities;

namespace Worker.Domain.Interfaces
{
    public interface ICalculatorRepository
    {
        Task<Calculator> GetById(string id);
        Task Save(string id, Calculator calculator);
    }
}
