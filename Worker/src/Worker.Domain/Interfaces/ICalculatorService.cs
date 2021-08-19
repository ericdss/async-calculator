using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Worker.Domain.Interfaces
{
    public interface ICalculatorService
    {
        Task CalculateSum(string id);
    }
}
